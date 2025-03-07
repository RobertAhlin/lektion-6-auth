const express = require('express');
import { Request, Response } from 'express';
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');


const { hashPassword, createToken, authenticateToken } = require('./auth');

const router = express.Router();
const filePath = path.join(__dirname, '../users.json');

// Läs användare från fil
function readUsers(): any[] {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    const data = fs.readFileSync(filePath, 'utf8').trim() || '[]';
    return JSON.parse(data);
}

// Skriv användare till fil
function writeUsers(users: any[]) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// Registrera användare (POST /api/register)
router.post('/register', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Användaren finns redan' });
    }

    const hashedPassword = hashPassword(password);
    const newUser = { email, password: hashedPassword };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'Användare registrerad' });
});

// Logga in användare (POST /api/login)
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Fel email eller lösenord' });
    }

    const token = createToken(email);
    res.json({ token });
});

// Skyddad route - Hämta alla användare (GET /api/users)
router.get('/users', authenticateToken, (req: Request, res: Response) => {
    const users = readUsers();
    res.json(users.map(u => ({ email: u.email })));  // Visa inte lösenord!
});

module.exports = router;  // CommonJS export
