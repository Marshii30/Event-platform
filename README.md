# 🎉 Planzee Events — Event Booking Platform  

Planzee Events is a **full-stack event booking platform** built with **React (frontend), Flask (backend), and MySQL (database)**.  
It allows users to browse events, book tickets via **Stripe Checkout**, and receive instant email confirmations.  
Admins can log in, view all bookings in a dashboard, and export them as **CSV/Excel**.  

---

## 🚀 Features  

### 🎟️ User Features  
- Browse **Shared Parties** & **Exclusive Parties**  
- Choose tickets (Super Early Bird, Early Bird, Regular)  
- Secure **Stripe payment integration**  
- Instant **email confirmation with ticket details**  
- Contact form for event inquiries  

### 🛠️ Admin Features  
- **Admin login system** (username + password)  
- Dashboard to view all bookings in a table  
- **Export bookings** as CSV or Excel with one click  
- Default login (if `.env` not configured):  
Username: admin
Password: secret123

---

## 🏗️ Tech Stack  

- **Frontend**: React + React Router  
- **Backend**: Flask (Python)  
- **Database**: MySQL  
- **Payments**: Stripe Checkout  
- **Email**: Flask-Mail (Gmail SMTP)  

---

## ⚙️ Installation  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/planzee-events.git
cd planzee-events
2️⃣ Backend Setup
cd backend
pip install -r requirements.txt
Create a .env file inside backend/ with:

# Stripe API Keys
STRIPE_SECRET_KEY=your_stripe_secret_key

# Mail Credentials
MAIL_USERNAME=yourgmail@gmail.com
MAIL_PASSWORD=your-app-password

# MySQL Database Connection
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=event_booking
DB_PORT=3306

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secret123
Run backend:

py app.py
3️⃣ Frontend Setup
cd frontend
npm install
npm start


Runs at: http://localhost:3000
📊 Database Setup

Inside MySQL:
CREATE DATABASE event_booking;

USE event_booking;

CREATE TABLE contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  consent1 BOOLEAN,
  consent2 BOOLEAN,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  ticket_type VARCHAR(255),
  amount INT,
  session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🧑‍💻 Usage

Open frontend → choose an event → book tickets → pay via Stripe → receive email confirmation.

Admin can log in at /admin/login → view bookings → export CSV/Excel.
📈 Why This Project is Valuable

Flippa-ready SaaS-style app

Monetizable via Stripe payments

Professional admin dashboard

Full source code + database schema + deployment guide included

Can be repurposed for concerts, meetups, parties, conferences
💸 Monetization

Sell event tickets online

Offer premium event listings

White-label for event agencies
📦 Deployment

Frontend → Vercel / Netlify

Backend → Railway / Heroku / VPS

Database → PlanetScale / AWS RDS / DigitalOcean
👨‍💻 Default Admin Login
Username: admin
Password: secret123
📧 Contact

If you’re interested in buying or customizing this project, feel free to reach out!