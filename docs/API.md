# 🔌 API Documentation

## Base URL

```
https://your-render-url.onrender.com
```

---

# Health Check

**GET**

```
/health
```

Response

```json
{
  "status": "ok"
}
```

---

# Authentication

Base Route

```
/api/auth
```

Provides APIs for:

- User registration
- Email OTP verification
- Login
- JWT Authentication

---

# Journey Synchronization

Base Route

```
/api/sync
```

Provides APIs for:

- Journey synchronization
- User journey data
- Scheduled journeys

---

# AI Assistant

Base Route

```
/api/assistant
```

Provides AI-powered travel assistance using Google Gemini.

Features:

- Natural language conversations
- Travel guidance
- Journey-related assistance

---

# Authentication

Protected routes require a valid JWT token.

Example:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Response Format

Successful responses

```json
{
  "success": true,
  "data": {}
}
```

Error responses

```json
{
  "success": false,
  "message": "Error message"
}
```