from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_mail import Mail, Message
import os
import stripe
import pandas as pd
import psycopg2
import psycopg2.extras
from urllib.parse import urlparse
from io import StringIO, BytesIO
from dotenv import load_dotenv, find_dotenv

# ---------------------------
# Env
# ---------------------------
load_dotenv(find_dotenv(), override=True)

app = Flask(__name__)
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:3000")
CORS(app, resources={r"/api/*": {"origins": [FRONTEND_ORIGIN, "http://localhost:3000"]}})

# Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")

# Mail
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", ""),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
    MAIL_DEFAULT_SENDER=("Planzee Events", os.getenv("MAIL_USERNAME", "")),
)
mail = Mail(app)

SUCCESS_URL = os.getenv("SUCCESS_URL", "http://localhost:3000/success")
CANCEL_URL  = os.getenv("CANCEL_URL", "http://localhost:3000/cancel")

# ---------------------------
# DB: Postgres (Neon)
# ---------------------------
DATABASE_URL = os.getenv("DATABASE_URL")  # postgresql://...

def get_db():
    if not DATABASE_URL:
        raise RuntimeError("DATABASE_URL not set")
    return psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.DictCursor)

DDL_CONTACT = """
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  consent1 BOOLEAN,
  consent2 BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

DDL_PAYMENTS = """
CREATE TABLE IF NOT EXISTS payment_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  ticket_type VARCHAR(255),
  amount INT,
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

def ensure_tables():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(DDL_CONTACT)
    cur.execute(DDL_PAYMENTS)
    conn.commit()
    cur.close()
    conn.close()

# ---------------------------
# Health
# ---------------------------
@app.route("/api/health")
def health():
    return jsonify({
        "ok": True,
        "stripe_configured": bool(stripe.api_key),
        "mail_configured": bool(app.config.get("MAIL_USERNAME")),
        "db_configured": bool(DATABASE_URL),
        "db_source": "neon-postgres" if DATABASE_URL else None
    })

@app.route("/api/init-db", methods=["GET", "POST"])
def init_db():
    try:
        ensure_tables()
        return jsonify({"ok": True, "message": "Tables ensured"}), 200
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

# ---------------------------
# Admin Login
# ---------------------------
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json or {}
    if data.get("username") == os.getenv("ADMIN_USERNAME", "admin") and data.get("password") == os.getenv("ADMIN_PASSWORD", "secret123"):
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# ---------------------------
# Stripe Checkout
# ---------------------------
@app.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.json or {}
    name = data.get("name", "")
    email = data.get("email", "")
    ticket_type = data.get("ticket_type", "General Ticket")
    amount_usd = int(data.get("amount", 0))
    amount_cents = amount_usd * 100

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": ticket_type},
                    "unit_amount": amount_cents,
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=SUCCESS_URL,
            cancel_url=CANCEL_URL,
        )

        ensure_tables()
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO payment_submissions (name, email, ticket_type, amount, session_id) VALUES (%s, %s, %s, %s, %s)",
            (name, email, ticket_type, amount_cents, session.id)
        )
        conn.commit()
        cur.close()
        conn.close()

        try:
            if app.config.get("MAIL_USERNAME"):
                msg = Message(
                    subject="Your Planzee Event Ticket 🎟️",
                    recipients=[email]
                )
                msg.body = f"""Hello {name},

Thank you for booking with Planzee Events! 🎉

🎟️ Ticket: {ticket_type}
💵 Amount Paid: ${amount_usd}

✅ Your booking is confirmed. Show your name/email at the event.
— Planzee Events Team
"""
                mail.send(msg)
        except Exception as mail_err:
            print("⚠️ Email failed:", mail_err)

        return jsonify({"id": session.id})
    except Exception as e:
        print("Stripe error:", e)
        return jsonify({"error": str(e)}), 500

# ---------------------------
# Contact Form
# ---------------------------
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json or {}
    required = ['name', 'email', 'company', 'phone', 'consent1', 'consent2']
    for f in required:
        if not data.get(f):
            return jsonify({"error": f"Missing field: {f}"}), 400
    try:
        ensure_tables()
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """INSERT INTO contact_submissions
               (name, email, company, phone, message, consent1, consent2)
               VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (data['name'], data['email'], data['company'], data['phone'], data.get('message',''), data['consent1'], data['consent2'])
        )
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Contact submitted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------
# Bookings
# ---------------------------
@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    try:
        ensure_tables()
        conn = get_db()
        df = pd.read_sql(
            "SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC",
            conn
        )
        conn.close()
        if "amount" in df.columns:
            df["amount"] = (df["amount"].astype(int) / 100.0)
        return jsonify(df.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/bookings/export/csv", methods=["GET"])
def export_bookings_csv():
    try:
        ensure_tables()
        conn = get_db()
        df = pd.read_sql(
            "SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC",
            conn
        )
        conn.close()
        if df.empty:
            return jsonify({"error": "No bookings available to export"}), 404
        df["amount"] = (df["amount"].astype(int) / 100.0)
        buf = StringIO()
        df.to_csv(buf, index=False)
        mem = BytesIO(buf.getvalue().encode("utf-8"))
        mem.seek(0)
        return send_file(mem, as_attachment=True, download_name="bookings.csv", mimetype="text/csv")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/bookings/export/excel", methods=["GET"])
def export_bookings_excel():
    try:
        ensure_tables()
        conn = get_db()
        df = pd.read_sql(
            "SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC",
            conn
        )
        conn.close()
        if df.empty:
            return jsonify({"error": "No bookings available to export"}), 404
        df["amount"] = (df["amount"].astype(int) / 100.0)
        mem = BytesIO()
        with pd.ExcelWriter(mem, engine="openpyxl") as writer:
            df.to_excel(writer, index=False, sheet_name="Bookings")
        mem.seek(0)
        return send_file(
            mem,
            as_attachment=True,
            download_name="bookings.xlsx",
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------
# Run
# ---------------------------
if __name__ == "__main__":
    if os.getenv("AUTO_INIT_DB", "1").lower() in ("1", "true", "yes"):
        try:
            ensure_tables()
            print("✅ Tables ensured on startup.")
        except Exception as e:
            print("⚠️ Auto-init failed:", e)

    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
