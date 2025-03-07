
# Lesson 6 - Security and Authentication

This project is an exercise in building an API using **Node.js**, **Express**, and **TypeScript**, focusing on:
- Hashing passwords using bcrypt
- Creating and verifying JWT tokens
- Protecting routes with authentication

---

## Technical Information
| Technology | Version |
|---|---|
| Node.js | 22.x |
| Express | 4.18.x |
| TypeScript | 5.x |
| Bcrypt.js | Latest |
| JSON Web Token | Latest |

---

## Project Structure
```
Lektion6/
├── src/
│   ├── server.ts        // Starts the server and connects the users router
│   ├── auth.ts           // Handles password hashing, JWT, and auth middleware
│   ├── users.ts          // Routes for register, login, and protected route
├── users.json            // Simple "database"
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Installation
```bash
npm install
```

---

## Start the server
```bash
npm run dev
```

---

## API Documentation

### POST /api/register
Register a new user.

**Body (JSON):**
```json
{
    "email": "test@example.com",
    "password": "secret"
}
```

**Response:**
```json
{
    "message": "User registered"
}
```

---

### POST /api/login
Log in and receive a JWT token.

**Body (JSON):**
```json
{
    "email": "test@example.com",
    "password": "secret"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOi..."
}
```

---

### GET /api/users
Fetch all users (requires token).

**Headers:**
```
Authorization: Bearer [your token]
```

**Response:**
```json
[
    { "email": "test@example.com" }
]
```

---

## Example of users.json
```json
[
    {
        "email": "test@example.com",
        "password": "$2a$10$XYZ..." // Hashed password
    }
]
```

---

## Development Tips
- Use Postman or Insomnia to test all endpoints.
- Save your token after login so you can reuse it for protected routes.

---

## Author
**Lesson 6 - Backend Development with Node.js and Express**
