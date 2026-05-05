import { Router } from 'express'; // o que é o router do express? é um componente que permite criar rotas modulares e montáveis em uma aplicação Express.
import ClientRepository from '../repository/client-repository.js';
import { authenticateToken } from '../middleware/jwt-auth-middleware.js';
import clientRepository from '../repository/client-repository.js';
import { StatusCodes } from 'http-status-codes';

const clientsRoutes = Router();

clientsRoutes.get('/client', authenticateToken, getClient);
clientsRoutes.post('/client', authenticateToken, createClient);
clientsRoutes.put('/client/:id', authenticateToken, updateClient);
clientsRoutes.delete('/client/:id', authenticateToken, deleteClient);
clientsRoutes.get('/client/id/:id', authenticateToken, getClientById);
clientsRoutes.get(
  '/client/name/:nameClient',
  authenticateToken,
  getClientByName,
);

async function getClient(req, res) {
  const clients = await ClientRepository.getAllClients();
  res.status(StatusCodes.OK).json(clients);
}

async function createClient(req, res) {
  const newClient = req.body;
  await ClientRepository.createClient(newClient);
  res.status(StatusCodes.OK).json(newClient);
}

async function updateClient(req, res) {
  const id = req.params.id;
  const updatedClient = req.body;
  await ClientRepository.updateClient(id, updatedClient);
  res.status(StatusCodes.OK).json(updatedClient);
}

async function deleteClient(req, res) {
  const id = req.params.id;
  await ClientRepository.deleteClient(id);
  res.status(StatusCodes.OK).json({ message: 'Client deleted successfully' });
}

async function getClientById(req, res) {
  const index = req.params.id;
  const client = await ClientRepository.getClientById(index);
  if (!client || client.length === 0) {
    throw new NotFoundError('User not found');
  }
  res.status(StatusCodes.OK).json(client);
}

async function getClientByName(req, res) {
  const name = req.params.nameClient;
  const client = await clientRepository.getClientByName(name);
  if (!client || client.length === 0) {
    throw new NotFoundError('User not found');
  }
  res.status(StatusCodes.OK).json(client);
}

export default clientsRoutes;
