import { Router } from 'express';
import UserRepository from '../repository/user-repository.js';
import { StatusCodes } from 'http-status-codes';

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
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    const message = error.message;
    if (message.includes('required')) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: message });
    } else if (message.includes('not found')) {
      res.status(StatusCodes.NOT_FOUND).json({ error: message });
    }
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
  try {
    const name = req.params.nameUser;
    const user = await UserRepository.getUserByName(name);
    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await UserRepository.getUserById(id);
    if (!user || user.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

export default userRoutes;
