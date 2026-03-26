import { Router } from 'express';
import UserRepository from '../repository/user-repository.js';

const userRoutes = Router();

userRoutes.get('/users', getAllUser);
userRoutes.post('/user', createUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);
userRoutes.get('/user/:nameUser', getUserByName);

async function getAllUser(req, res) {
  const users = await UserRepository.getAllUsers();
  res.json(users);
}

async function createUser(req, res) {
  try {
    const user = req.body;
    const createdUser = await UserRepository.createUser(user);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Erro ao criar usuário', error: error.message });
  }
}

async function updateUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  const updatedUser = await UserRepository.updateUser(id, user);
  res.json(updatedUser);
}

async function deleteUser(req, res) {
  const id = req.params.id;
  const deletedUser = await UserRepository.deleteUser(id);
  res.json(deletedUser);
}

async function getUserByName(req, res) {
  const name = req.params.nameUser;
  const user = await UserRepository.getUserByName(name);
  res.json(user);
}

export default userRoutes;
