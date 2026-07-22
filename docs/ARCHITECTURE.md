# 🏗 Backend Architecture

WayWise Backend follows a modular Express.js architecture.

```
Flutter App
      │
      ▼
Express.js Server
      │
 ┌────┴──────────────┐
 │                   │
 ▼                   ▼
MongoDB Atlas    Gemini AI
```

---

# Core Components

## Express Server

Handles:

- HTTP Requests
- Routing
- Middleware
- Error Handling

---

## Authentication

- Email OTP
- JWT Authentication

---

## Database

MongoDB Atlas stores:

- Users
- Journey Data
- Scheduled Journeys
- Emergency Contacts

---

## AI Service

Google Gemini powers:

- AI Assistant
- Travel conversations

---

## Security

- Helmet
- CORS
- JWT Authorization
- Environment Variables

---

## Deployment

Hosted on Render.