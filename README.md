# Visitor Pass Management System

## Project Overview

The Visitor Pass Management System is a MERN Stack application developed to digitize visitor management in organizations. The system replaces traditional manual visitor registers with a digital platform that allows visitor registration, appointment management, pass generation, and visitor check-in/check-out tracking.

The application provides different functionalities for administrators, employees, and security personnel to efficiently manage visitors and maintain visitor records.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Role-based User Management

### Visitor Management

* Add New Visitors
* View Visitor Details
* Delete Visitors
* Store Visitor Information

### Appointment Management

* Create Appointments
* View Appointments
* Approve Appointments
* Reject Appointments
* Track Appointment Status

### Pass Management

* Generate Visitor Passes
* QR Code Generation
* Download Pass as PDF
* Prevent Duplicate Pass Generation

### Check-In / Check-Out

* Visitor Check-In
* Visitor Check-Out
* Check Log History
* Time Tracking

### Dashboard

* Total Visitors Count
* Total Appointments Count
* Total Passes Count
* Total Check Logs Count

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

* MongoDB
* Mongoose

### Additional Libraries

* JSON Web Token (JWT)
* bcryptjs
* QRCode
* PDFKit
* CORS

---

## Project Structure

```text
Visitor-Pass-Management-System

├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── config
│   └── index.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── public
│
└── README.md
```

---

## Database Collections

### User

* name
* email
* password
* role

### Visitor

* name
* email
* phone
* company
* photo

### Appointment

* visitorId
* hostId
* purpose
* visitDate
* status

### Pass

* appointmentId
* qrData
* qrImage
* issuedBy
* validTill

### CheckLog

* passId
* checkInTime
* checkOutTime

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd Visitor-Pass-Management-System
```

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Visitors

```http
GET    /api/visitors
POST   /api/visitors
GET    /api/visitors/:id
DELETE /api/visitors/:id
```

### Appointments

```http
GET   /api/appointments
POST  /api/appointments
PATCH /api/appointments/:id/approve
PATCH /api/appointments/:id/reject
```

### Passes

```http
GET  /api/passes
GET  /api/passes/:id
POST /api/passes/generate/:appointmentId
GET  /api/passes/pdf/:id
```

### Check Logs

```http
GET  /api/checklog
POST /api/checklog/checkin/:passId
POST /api/checklog/checkout/:passId
```

---

## Workflow

1. User logs into the system.
2. Visitor is registered.
3. Appointment is created for the visitor.
4. Appointment is approved.
5. Visitor pass is generated.
6. QR Code and PDF pass are created.
7. Visitor checks in.
8. Visitor checks out.
9. Check logs are stored and displayed.

---

## Challenges Faced

* Understanding MongoDB relationships using Mongoose references.
* Implementing JWT authentication and authorization.
* Generating QR codes dynamically.
* Creating downloadable PDF visitor passes.
* Managing frontend-backend integration using Axios.
* Handling deployment and environment variables.

---

## Future Improvements

* Email Notifications
* SMS Notifications
* QR Code Scanner Integration
* Visitor Photo Upload
* Multi-location Support
* Analytics Dashboard
* Export Reports to Excel/PDF
* OTP Verification

---

## Author

Deep Shah

