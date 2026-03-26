import jwt from 'jsonwebtoken';
import express, { Router } from 'express';
import UserRepository from '../repository/user-repository.js';

const authRoute = Router();

const SecretKey = process.env.SECRET_KEY;
console.log(SecretKey);

authRoute.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await UserRepository.getAllUsers();
  const user = users.find(
    (user) => user.username === username && user.password === password,
  );
  if (user) {
    const token = jwt.sign({ id: user.id }, SecretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export default authRoute;

/*

authRoute.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await UserRepository.getAllUsers();
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
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/
