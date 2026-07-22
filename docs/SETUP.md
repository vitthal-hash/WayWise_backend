# ⚙ Setup Guide

## Requirements

- Node.js
- npm
- MongoDB Atlas
- Google Gemini API Key

---

## Clone Repository

```bash
git clone https://github.com/vitthal-hash/WayWise_backend.git
```

---

## Install

```bash
npm install
```

---

## Environment Variables

Copy

```
.env.example
```

to

```
.env
```

Fill in:

- MongoDB URI
- JWT Secret
- Email credentials
- Gemini API Key

---

## Start Development Server

```bash
npm run dev
```

---

## Production

```bash
npm start
```

---

## Health Check

Visit

```
/health
```

to verify the server is running.