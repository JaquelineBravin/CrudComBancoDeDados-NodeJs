import jwt from 'jsonwebtoken';
import { Router } from 'express';
import UserRepository from '../repository/user-repository.js';

const authRoute = Router();

const SecretKey = process.env.SECRET_KEY;

authRoute.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await UserRepository.getAllUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      const token = jwt.sign({ id: user.id }, SecretKey, { expiresIn: '5h' });
      res.json({ token });
    } else {
      throw new BadRequestError('Invalid credentials');
    }
  } catch (error) {
    throw new InternalServerError(
      'An error occurred while processing the request',
    );
  }
});

export default authRoute;
