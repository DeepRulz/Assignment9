# Visitor Pass Management System

## Project Overview

The Visitor Pass Management System is a MERN Stack web application designed to digitize and automate visitor management in organizations. The system replaces traditional paper-based visitor registers with a secure digital platform that supports visitor registration, appointment scheduling, pass generation, visitor tracking, and access management.

The application provides functionality for administrators, employees, and security personnel to efficiently manage visitors while maintaining accurate records and improving security.

---

## Features

### Authentication & Security

* User Registration
* User Login
* JWT-Based Authentication
* Protected Routes
* Password Hashing using bcrypt
* Role-Based User Management

---

### Visitor Management

* Add New Visitors
* View Visitor Details
* Delete Visitors
* Upload Visitor Photos
* Search Visitors by Name, Email, or Company
* Store Visitor Information

---

### Appointment Management

* Create Appointments
* View Appointments
* Approve Appointments
* Reject Appointments
* Track Appointment Status
* Appointment Status Filtering

---

### Pass Management

* Generate Visitor Passes
* QR Code Generation
* Download Visitor Pass as PDF
* Prevent Duplicate Pass Generation
* Pass Validation

---

### Check-In / Check-Out Management

* Visitor Check-In
* Visitor Check-Out
* Check Log History
* Entry and Exit Time Tracking

---

### Notifications

* Email Notification on Appointment Approval
* Email Notification on Appointment Rejection
* Email Notification on Pass Generation

---

### Dashboard

* Total Visitors Count
* Total Appointments Count
* Total Passes Count
* Total Check Logs Count
* System Overview Statistics

---

### Search, Filter & Export

* Visitor Search
* Appointment Status Filter
* CSV Export for Reports

---

### Demo Data Support

* Database Seed Script
* Automatic Creation of Sample Users
* Automatic Creation of Sample Visitors
* Automatic Creation of Sample Appointments
* Automatic Creation of Sample Passes
* Automatic Creation of Sample Check Logs

---

## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Additional Libraries

* JSON Web Token (JWT)
* bcryptjs
* Nodemailer
* Multer
* QRCode
* PDFKit
* CORS

---

## Project Structure

```text
Visitor-Pass-Management-System

├── backend
│
├── controllers
├── middleware
├── models
├── routes
├── services
├── uploads
├── utils
├── seed.js
├── app.js
└── index.js
│
├── frontend
│
├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

## Database Collections

### User

| Field    | Type   |
| -------- | ------ |
| name     | String |
| email    | String |
| password | String |
| role     | String |

---

### Visitor

| Field   | Type   |
| ------- | ------ |
| name    | String |
| email   | String |
| phone   | String |
| company | String |
| photo   | String |

---

### Appointment

| Field     | Type     |
| --------- | -------- |
| visitorId | ObjectId |
| hostId    | ObjectId |
| purpose   | String   |
| visitDate | Date     |
| status    | String   |

---

### Pass

| Field         | Type     |
| ------------- | -------- |
| appointmentId | ObjectId |
| qrData        | String   |
| qrImage       | String   |
| issuedBy      | ObjectId |
| validTill     | Date     |

---

### CheckLog

| Field        | Type     |
| ------------ | -------- |
| passId       | ObjectId |
| checkInTime  | Date     |
| checkOutTime | Date     |

---

## Installation

### Clone Repository

```bash
git clone <repository-url>

cd Visitor-Pass-Management-System
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

Run Backend:

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend:

```bash
npm run dev
```

---

## Demo Data

To populate the database with sample records:

```bash
npm run seed
```

The seed script creates:

* Admin User
* Employee User
* Security User
* Sample Visitors
* Sample Appointments
* Sample Passes
* Sample Check Logs

---

## API Endpoints

### Authentication

```http
POST /api/auth/register

POST /api/auth/login
```

---

### Visitors

```http
GET    /api/visitors

POST   /api/visitors

PATCH  /api/visitors/:id

DELETE /api/visitors/:id

GET    /api/visitors/search?q=
```

---

### Appointments

```http
GET   /api/appointments

POST  /api/appointments

PATCH /api/appointments/:id/approve

PATCH /api/appointments/:id/reject
```

---

### Passes

```http
GET  /api/passes

GET  /api/passes/:id

POST /api/passes/generate/:appointmentId

GET  /api/passes/pdf/:id
```

---

### Check Logs

```http
GET  /api/checklog

POST /api/checklog/checkin/:passId

POST /api/checklog/checkout/:passId
```

---

## System Workflow

1. User logs into the system.
2. Visitor is registered.
3. Visitor photo is uploaded.
4. Appointment is created.
5. Appointment is approved or rejected.
6. Email notification is sent.
7. Visitor pass is generated.
8. QR code and PDF pass are created.
9. Pass generation email is sent.
10. Visitor checks in.
11. Visitor checks out.
12. Check logs are stored and displayed.

---

## Deployment

### Frontend

Netlify

### Backend

Render

### Database

MongoDB Atlas

---

## Challenges Faced

* Understanding MongoDB relationships using Mongoose references.
* Implementing JWT Authentication and Authorization.
* Handling file uploads using Multer.
* Sending emails using Nodemailer.
* Generating QR Codes dynamically.
* Creating downloadable PDF Visitor Passes.
* Managing frontend-backend communication using Axios.
* Deploying frontend and backend separately.
* Managing environment variables securely.

---

## Future Improvements

* QR Code Scanner Integration
* SMS Notifications
* Multi-Location Support
* Analytics Dashboard
* PDF Report Export
* OTP Verification
* Mobile Application

---

## Author

**Deep Shah**