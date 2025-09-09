# backend/app.py
import os
import io
import pandas as pd
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import stripe
from flask_mail import Mail, Message

load_dotenv()  # read .env (local dev only; on Render set env vars in UI)

app = Flask(__name__)
CORS(app)

# --- Config from env ---
DATABASE_URL = os.getenv("DATABASE_URL")  # preferred full url (neon)
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT", "5432")  # default for postgres

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "secret123")

# Stripe
if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY

# Mail config
app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER", "smtp.gmail.com")
app.config['MAIL_PORT'] = int(os.getenv("MAIL_PORT", 587))
app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS", "True").lower() in ("true", "1", "yes")
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
app.config['MAIL_DEFAULT_SENDER'] = (os.getenv("MAIL_SENDER_NAME", "Planzee Events"), MAIL_USERNAME)

mail = Mail(app)

# Build SQLAlchemy engine from DATABASE_URL or components
def build_db_engine():
    if DATABASE_URL:
        url = DATABASE_URL
    elif DB_HOST and DB_USER and DB_NAME:
        engine_name = os.getenv("DB_ENGINE", "postgresql")
        if engine_name.startswith("mysql"):
            url = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        else:
            url = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    else:
        return None

    # convert older postgres:// to modern prefix if necessary
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+psycopg2://", 1)

    engine = create_engine(url, pool_pre_ping=True)
    return engine

engine = build_db_engine()

# helper to ensure table exists
def ensure_table():
    if engine is None:
        return
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS payment_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        ticket_type VARCHAR(255),
        amount INTEGER,
        session_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    with engine.begin() as conn:
        conn.execute(text(create_table_sql))

# small helper: run a SELECT and return list-of-dicts
def fetch_rows(query, params=None):
    if engine is None:
        return []
    params = params or {}
    with engine.connect() as conn:
        result = conn.execute(text(query), params)
        rows = [dict(r._mapping) for r in result]
    return rows

# Health endpoint
@app.route("/api/health", methods=["GET", "HEAD"])
def health():
    db_configured = engine is not None
    mail_configured = bool(MAIL_USERNAME and MAIL_PASSWORD)
    stripe_configured = bool(STRIPE_SECRET_KEY)
    db_ok = False
    db_source = None
    try:
        if engine:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            db_ok = True
            db_source = str(engine.url)
    except Exception as e:
        db_ok = False
        db_source = str(e)

    return jsonify({
        "ok": True,
        "db_configured": db_ok,
        "db_source": db_source,
        "mail_configured": mail_configured,
        "stripe_configured": stripe_configured
    })

# Admin login
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json or {}
    username = data.get("username")
    password = data.get("password")
    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        return jsonify({"success": True, "message": "Login successful"})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Checkout endpoint
@app.route("/api/create-checkout-session", methods=["POST"])
def create_checkout_session():
    if stripe.api_key is None:
        return jsonify({"error": "Stripe not configured"}), 500

    data = request.json or {}
    amount = int(data.get("amount", 0))
    if amount > 0 and amount < 1000000:
        cents = int(amount * 100)
    else:
        cents = amount

    ticket_type = data.get("ticketType") or data.get("ticket_type") or "Event Ticket"
    name = data.get("name")
    email = data.get("email")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": ticket_type},
                    "unit_amount": cents,
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=os.getenv("SUCCESS_URL", "http://localhost:3000/success"),
            cancel_url=os.getenv("CANCEL_URL", "http://localhost:3000/cancel"),
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # ensure table exists and insert record (best-effort)
    try:
        ensure_table()
        if engine:
            with engine.begin() as conn:
                insert_sql = text("""
                    INSERT INTO payment_submissions (name, email, ticket_type, amount, session_id)
                    VALUES (:name, :email, :ticket_type, :amount, :session_id)
                """)
                conn.execute(insert_sql, {
                    "name": name,
                    "email": email,
                    "ticket_type": ticket_type,
                    "amount": cents,
                    "session_id": session.id
                })
    except Exception as e:
        # log error but continue
        print("DB insert error:", e)

    # send confirmation email (best-effort)
    if MAIL_USERNAME and MAIL_PASSWORD and email:
        try:
            msg = Message(
                subject="Your Planzee Event Ticket 🎟️",
                recipients=[email]
            )
            msg.body = f"""Hello {name},

Thank you for booking with Planzee Events!

Ticket: {ticket_type}
Amount Paid: ${cents/100:.2f}

We will send further details to this email.

- Planzee Events
"""
            mail.send(msg)
        except Exception as mail_err:
            print("Mail send error:", mail_err)

    return jsonify({"id": session.id})

# Fetch bookings
@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    try:
        ensure_table()
        if engine is None:
            return jsonify({"error": "Database is not configured."}), 500

        rows = fetch_rows("SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC")
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Export CSV
@app.route("/api/bookings/export/csv", methods=["GET"])
def export_bookings_csv():
    try:
        ensure_table()
        if engine is None:
            return jsonify({"error": "Database is not configured."}), 500

        rows = fetch_rows("SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC")
        if not rows:
            return jsonify({"error": "No bookings available to export"}), 404

        df = pd.DataFrame(rows)
        buf = io.StringIO()
        df.to_csv(buf, index=False)
        buf.seek(0)
        return send_file(io.BytesIO(buf.getvalue().encode('utf-8')), mimetype="text/csv", as_attachment=True, download_name="bookings.csv")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Export Excel
@app.route("/api/bookings/export/excel", methods=["GET"])
def export_bookings_excel():
    try:
        ensure_table()
        if engine is None:
            return jsonify({"error": "Database is not configured."}), 500

        rows = fetch_rows("SELECT id, name, email, ticket_type, amount, created_at FROM payment_submissions ORDER BY created_at DESC")
        if not rows:
            return jsonify({"error": "No bookings available to export"}), 404

        df = pd.DataFrame(rows)
        buf = io.BytesIO()
        with pd.ExcelWriter(buf, engine="openpyxl") as writer:
            df.to_excel(writer, index=False, sheet_name="bookings")
        buf.seek(0)
        return send_file(buf, mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", as_attachment=True, download_name="bookings.xlsx")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional contact endpoint
@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.json or {}
    name = data.get("name")
    email = data.get("email")
    message = data.get("message", "")
    try:
        if MAIL_USERNAME and MAIL_PASSWORD:
            msg = Message(subject="Website contact form", recipients=[MAIL_USERNAME])
            msg.body = f"From: {name} <{email}>\n\n{message}"
            mail.send(msg)
        return jsonify({"ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # local dev
    ensure_table()
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 5000))
    app.run(host=host, port=port, debug=True)
