# Visitor Pass Management System

## Project Overview

The Visitor Pass Management System is a MERN Stack web application developed to digitize and automate visitor management in organizations. The system replaces traditional paper-based visitor registers with a secure digital platform that manages visitor registration, appointment scheduling, pass generation, visitor tracking, and access control.

The application supports multiple user roles and provides facilities for visitor management, appointment approval workflows, QR-based pass generation, PDF pass downloads, email notifications, and visitor check-in/check-out tracking.

---

# Features

## Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control (RBAC)
* Backend Input Validation

---

## Visitor Management

* Add Visitors
* Update Visitor Information
* Delete Visitors
* Upload Visitor Photos
* Search Visitors by Name, Email, or Company
* View Visitor Records

---

## Appointment Management

* Create Appointments
* View Appointments
* Approve Appointments
* Reject Appointments
* Track Appointment Status
* Appointment Filtering

---

## Pass Management

* Generate Visitor Passes
* Dynamic QR Code Generation
* Download Visitor Pass as PDF
* Duplicate Pass Prevention
* Pass Validation

---

## Check-In / Check-Out

* Visitor Check-In
* Visitor Check-Out
* Check Log History
* Entry and Exit Time Tracking

---

## Notifications

* Appointment Approval Email Notifications
* Appointment Rejection Email Notifications
* Pass Generation Email Notifications

---

## Dashboard

* Total Visitors Count
* Total Appointments Count
* Total Passes Count
* Total Check Logs Count
* System Overview Statistics

---

## Search, Filter & Export

* Visitor Search
* Appointment Status Filter
* CSV Export Functionality

---

## Demo Data Support

* Database Seed Script
* Automatic Sample Data Generation
* Admin User Creation
* Employee User Creation
* Security User Creation
* Sample Visitors
* Sample Appointments
* Sample Passes
* Sample Check Logs

---

# Technology Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Additional Libraries

* JWT (jsonwebtoken)
* bcryptjs
* Nodemailer
* Multer
* QRCode
* PDFKit
* CORS

---

# Project Structure

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

# Database Collections

## User

| Field    | Type   |
| -------- | ------ |
| name     | String |
| email    | String |
| password | String |
| role     | String |

### Supported Roles

* Admin
* Employee
* Security

---

## Visitor

| Field   | Type   |
| ------- | ------ |
| name    | String |
| email   | String |
| phone   | String |
| company | String |
| photo   | String |

---

## Appointment

| Field     | Type     |
| --------- | -------- |
| visitorId | ObjectId |
| hostId    | ObjectId |
| purpose   | String   |
| visitDate | Date     |
| status    | String   |

---

## Pass

| Field         | Type     |
| ------------- | -------- |
| appointmentId | ObjectId |
| qrData        | String   |
| qrImage       | String   |
| issuedBy      | ObjectId |
| validTill     | Date     |

---

## CheckLog

| Field        | Type     |
| ------------ | -------- |
| passId       | ObjectId |
| checkInTime  | Date     |
| checkOutTime | Date     |

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd Visitor-Pass-Management-System
```

---

# Backend Setup

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

# Frontend Setup

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

# Demo Data

Populate the database with sample records:

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

# API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Visitors

```http
GET    /api/visitors
POST   /api/visitors
PATCH  /api/visitors/:id
DELETE /api/visitors/:id
GET    /api/visitors/search?q=
```

---

## Appointments

```http
GET   /api/appointments
POST  /api/appointments
PATCH /api/appointments/:id
DELETE /api/appointments/:id
PATCH /api/appointments/:id/approve
PATCH /api/appointments/:id/reject
```

---

## Passes

```http
GET  /api/passes
GET  /api/passes/:id
POST /api/passes/generate/:appointmentId
GET  /api/passes/pdf/:id
```

---

## Check Logs

```http
GET  /api/checklog
POST /api/checklog/checkin/:passId
POST /api/checklog/checkout/:passId
```

---

# System Workflow

1. User logs into the system.
2. Visitor is registered.
3. Visitor photo is uploaded.
4. Appointment is created.
5. Appointment is approved or rejected.
6. Email notification is sent.
7. Visitor pass is generated.
8. QR code is generated.
9. PDF pass is created.
10. Pass generation email is sent.
11. Visitor checks in.
12. Visitor checks out.
13. Check logs are stored and displayed.

---

# Role-Based Access Control

| Action              | Admin | Employee | Security |
| ------------------- | ----- | -------- | -------- |
| Add Visitor         | Yes   | Yes      | No       |
| View Visitors       | Yes   | Yes      | Yes      |
| Update Visitor      | Yes   | No       | No       |
| Delete Visitor      | Yes   | No       | No       |
| Create Appointment  | Yes   | Yes      | No       |
| Approve Appointment | Yes   | No       | No       |
| Reject Appointment  | Yes   | No       | No       |
| Generate Pass       | Yes   | No       | No       |
| View Passes         | Yes   | Yes      | Yes      |
| Check In            | Yes   | No       | Yes      |
| Check Out           | Yes   | No       | Yes      |
| View Check Logs     | Yes   | No       | Yes      |

---

# Deployment

## Frontend

Netlify

## Backend

Render

## Database

MongoDB Atlas

---

# Development Approach and Academic Integrity

This project was developed as a learning-oriented MERN Stack application. Throughout development, emphasis was placed on understanding and implementing the core concepts required for a full-stack web application rather than simply assembling features.

The project involved:

* Designing MongoDB schemas and relationships.
* Building RESTful APIs using Express.js.
* Implementing authentication and authorization using JWT.
* Securing passwords using bcrypt hashing.
* Creating middleware for authentication and role validation.
* Managing file uploads using Multer.
* Sending automated emails using Nodemailer.
* Generating QR codes and PDF visitor passes.
* Deploying frontend and backend services separately.
* Implementing role-based access control and input validation.

All features were individually tested, integrated, debugged, and refined throughout the development process. Additional improvements such as RBAC enforcement, input validation, deployment fixes, visitor photo uploads, email notifications, CSV export functionality, and security enhancements were incorporated after review and testing.

This project served as a practical exercise in applying MERN Stack concepts, understanding application architecture, debugging real-world issues, and deploying a complete full-stack application.

---

# Challenges Faced

* Understanding MongoDB relationships using Mongoose references.
* Implementing JWT Authentication and Authorization.
* Managing Role-Based Access Control.
* Handling file uploads using Multer.
* Sending emails using Nodemailer.
* Generating QR Codes dynamically.
* Creating downloadable PDF Visitor Passes.
* Integrating frontend and backend APIs.
* Debugging deployment issues on Netlify and Render.
* Implementing validation and security checks.

## Testing Performed

The application was tested end-to-end using sample users, visitors, appointments, passes, and check logs.

### Authentication

* User Registration
* User Login
* JWT Token Verification
* Role-Based Access Control

### Visitor Management

* Add Visitor
* Delete Visitor
* Search Visitors
* Upload Visitor Photos

### Appointment Management

* Create Appointment
* Approve Appointment
* Reject Appointment

### Pass Management

* Generate Visitor Pass
* Download PDF Pass
* QR Code Generation

### QR Scanner

* Valid QR Detection
* Invalid QR Rejection
* Automatic Check-In
* Automatic Check-Out

### Notifications

* Appointment Approval Email
* Appointment Rejection Email
* Pass Generation Email
* SMS Notifications

### Security Features

* Protected Routes
* Input Validation
* Rate Limiting
* Restricted CORS
* Password Hashing

### Deployment

* Frontend deployed on Netlify
* Backend deployed on Render
* Database hosted on MongoDB Atlas

---

# Author

**Deep Shah**
