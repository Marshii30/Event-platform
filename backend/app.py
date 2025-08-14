from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Maharshi@2004",
        database="event_booking"
    )

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    print("Contact form data received:", data)  # Debug

    # Required fields validation
    required_fields = ['name', 'email', 'company', 'phone', 'consent1', 'consent2']
    for field in required_fields:
        if field not in data or data[field] in [None, '', False]:
            return jsonify({"error": f"Missing or invalid field: {field}"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = """
            INSERT INTO contact_submissions
            (name, email, company, phone, message, consent1, consent2)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(sql, (
            data['name'],
            data['email'],
            data['company'],
            data['phone'],
            data.get('message', ''),
            data['consent1'],
            data['consent2']
        ))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Contact form submitted successfully"}), 200
    except Exception as e:
        print(f"Error inserting contact submission: {e}")
        return jsonify({"error": "Failed to submit contact form"}), 500

@app.route('/api/payment', methods=['POST'])
def payment():
    data = request.json
    print("Received payment data:", data)  # Debug

    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        sql = "INSERT INTO payment_submissions (name, email) VALUES (%s, %s)"
        cursor.execute(sql, (name, email))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Payment info submitted successfully"}), 200
    except Exception as e:
        print(f"Error inserting payment submission: {e}")
        return jsonify({"error": "Failed to submit payment info"}), 500

if __name__ == '__main__':
    app.run(debug=True)
