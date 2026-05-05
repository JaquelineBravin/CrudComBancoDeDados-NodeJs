import { Router } from 'express';
import UserRepository from '../repository/user-repository.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../utils/api-errors.js';

const userRoutes = Router();

userRoutes.get('/users', getAllUser);
userRoutes.post('/user', createUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);
userRoutes.get('/user/id/:id', getUserById);
userRoutes.get('/user/name/:nameUser', getUserByName);

async function getAllUser(req, res) {
  const users = await UserRepository.getAllUsers();
  res.status(StatusCodes.OK).json(users);
}

async function createUser(req, res) {
  const user = req.body;
  await UserRepository.createUser(user);
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'User created successfully' });
}

async function updateUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  await UserRepository.updateUser(id, user);
  res.status(StatusCodes.OK).json({ message: 'User updated successfully' });
}

async function deleteUser(req, res) {
  const id = req.params.id;
  await UserRepository.deleteUser(id);
  res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
}

async function getUserByName(req, res) {
  const name = req.params.nameUser;
  const user = await UserRepository.getUserByName(name);
  if (!user || user.length === 0) {
    throw new NotFoundError('User not found');
  }
  res.status(StatusCodes.OK).json(user);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await UserRepository.getUserById(id);
  if (!user || user.length === 0) {
    throw new NotFoundError('User not found');
  }
  res.status(StatusCodes.OK).json(user);
}

export default userRoutes;
