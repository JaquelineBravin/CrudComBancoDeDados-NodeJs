import { Router } from 'express';
import UserRepository from '../repository/user-repository.js';
import { StatusCodes } from 'http-status-codes';

const userRoutes = Router();

userRoutes.get('/users', getAllUser);
userRoutes.post('/user', createUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);
userRoutes.get('/user/:nameUser', getUserByName);
userRoutes.get('/user/:id', getUserById);

async function getAllUser(req, res) {
  const users = await UserRepository.getAllUsers();
  res.status(StatusCodes.OK).json(users);
}

async function createUser(req, res) {
  try {
    const user = req.body;
    await UserRepository.createUser(user);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully' });
  } catch (error) {
    const message = error.message;
    let status = StatusCodes.INTERNAL_SERVER_ERROR;

    if (message.includes('required')) {
      status = StatusCodes.BAD_REQUEST;
    } else if (message.includes('already exists')) {
      status = StatusCodes.CONFLICT;
    }

    res.status(status).json({ error: message });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await UserRepository.updateUser(id, user);
    res.json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const deletedUser = await UserRepository.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
  }
}

async function getUserByName(req, res) {
  const name = req.params.nameUser;
  const user = await UserRepository.getUserByName(name);
  res.json(user);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await UserRepository.getUserById(id);
  res.json(user);
}

export default userRoutes;
