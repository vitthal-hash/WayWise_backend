# 🔒 Security

WayWise Backend follows common security practices to protect user accounts and API communication.

---

## Authentication

- Email OTP Verification
- JWT Authentication

---

## Password Security

Passwords are securely hashed before storage.

---

## API Security

- JWT Authorization
- Input Validation
- Protected Routes

---

## HTTP Security

Helmet is used to improve HTTP security.

---

## Cross-Origin Requests

CORS is enabled to allow communication with the WayWise mobile application.

---

## Environment Variables

Sensitive values are stored using environment variables.

Examples:

- MongoDB URI
- JWT Secret
- Gemini API Key
- Email Credentials

Never commit the `.env` file to the repository.