![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
<div align="center">

# ⚙️ WayWise Backend

### Node.js + Express Backend for WayWise

**Secure, scalable, and AI-powered backend powering the WayWise Smart Travel Companion.**

![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)
![Express.js](https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-darkgreen?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-blue?style=for-the-badge)
![Gemini](https://img.shields.io/badge/AI-Gemini-purple?style=for-the-badge)
![Render](https://img.shields.io/badge/Deployment-Render-blueviolet?style=for-the-badge)

</div>

---

# 📖 Table of Contents

- Overview
- Features
- Architecture
- Tech Stack
- API Routes
- Project Structure
- Installation
- Environment Variables
- Deployment
- Documentation
- License

---

# 🌍 Overview

WayWise Backend is the server-side component of the WayWise Smart Travel Companion.

It provides secure authentication, AI-powered travel assistance, cloud synchronization, journey management, and REST APIs for the Flutter mobile application.

The backend is built using Express.js and MongoDB Atlas and is deployed on Render.

---

# ✨ Features

## 🔐 Authentication

- Email OTP verification
- JWT Authentication
- Secure login sessions

---

## ☁ Cloud Synchronization

- User data synchronization
- Journey synchronization
- Scheduled journey management

---

## 🤖 AI Assistant

- Google Gemini integration
- Natural language travel assistance
- Conversational APIs

---

## 📍 Journey Services

- Journey management
- Scheduled journeys
- Travel history synchronization

---

## 🛡 Security

- Helmet security middleware
- CORS support
- Centralized error handling
- Environment-based configuration

---

# 🏗 System Architecture

```
Flutter Mobile App
        │
        ▼
 Node.js + Express API
        │
 ┌──────┴────────────┐
 │                   │
 ▼                   ▼
MongoDB Atlas    Gemini AI
```

---

# 💻 Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| AI | Gemini AI |
| Security | Helmet |
| Deployment | Render |

---

# 🔌 API Routes

| Endpoint | Purpose |
|----------|---------|
| `/health` | Health check |
| `/api/auth` | Authentication |
| `/api/sync` | Journey synchronization |
| `/api/assistant` | AI Assistant |

---

# 📂 Project Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
├── package.json
├── .env.example
├── README.md
└── LICENSE
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/vitthal-hash/WayWise_backend.git
cd WayWise_backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment

Create a `.env` file using `.env.example`.

Configure:

- MongoDB URI
- JWT Secret
- Email credentials
- Gemini API Key
- Other required environment variables

---

## Run Development Server

```bash
npm run dev
```

---

## Production

```bash
npm start
```

---

# 🌐 Deployment

The backend is deployed on **Render**.

## 🌐 Live API

Base URL:

https://waywise-backend-7cmm.onrender.com

Health Check:

https://waywise-backend-7cmm.onrender.com/health

---

# 📚 Documentation

Detailed documentation is available in the `docs` folder.

- API.md
- ARCHITECTURE.md
- SETUP.md
- SECURITY.md
- CHANGELOG.md

---

# 📱 Related Repository

**WayWise Mobile App**

https://github.com/vitthal-hash/WayWise

---

# 📄 License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

# 👨‍💻 Author

**Vitthal More**

Computer Engineering Student

If you found this project useful, consider giving it a ⭐ on GitHub.