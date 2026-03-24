import jwt from 'jsonwebtoken';
import express, { Router } from 'express';

const authRoute = Router();

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

const SecretKey = process.env.SECRET_KEY;
console.log(SecretKey);

authRoute.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SecretKey,
      { expiresIn: '1h' },
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default authRoute;
