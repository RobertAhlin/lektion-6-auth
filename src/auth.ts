const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'superhemlig-nyckel';  // I produktion skulle denna ligga i .env

// Hashar lösenord
function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

// Skapar JWT-token
function createToken(email: string): string {
    return jwt.sign({ email }, secretKey, { expiresIn: '1h' });
}

// Middleware för att skydda rutter
function authenticateToken(req: any, res: any, next: Function) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Ingen token tillhandahållen' });
    }

    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;  // Lägg till användaren i request-objektet
        next();
    } catch (error) {
        res.status(403).json({ error: 'Ogiltig token' });
    }
}

module.exports = { hashPassword, createToken, authenticateToken };
