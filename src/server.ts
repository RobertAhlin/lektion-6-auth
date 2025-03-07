const express = require('express');
import { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// Enkel test-route direkt i server.ts
app.get('/', (req: Request, res: Response) => {
    res.send('Välkommen till Lektion 6!');
});

// Importera och koppla in users-routes (om de finns)
const usersRouter = require('./users'); // När du skapar den
app.use('/api', usersRouter); // Om du har dina register/login-routes i users.ts

// Starta servern
app.listen(port, () => {
    console.log(`Servern är startad på http://localhost:${port}`);
});
