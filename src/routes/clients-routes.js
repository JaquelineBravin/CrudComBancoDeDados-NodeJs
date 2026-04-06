import { Router } from 'express'; // o que é o router do express? é um componente que permite criar rotas modulares e montáveis em uma aplicação Express.
import ClientRepository from '../repository/client-repository.js';
import { authenticateToken } from '../middleware/jwt-auth-middleware.js';
import clientRepository from '../repository/client-repository.js';
import { StatusCodes } from 'http-status-codes';

const clientsRoutes = Router();

clientsRoutes.get('/client', authenticateToken, getClient);
clientsRoutes.post('/client', createClient);
clientsRoutes.put('/client/:id', updateClient);
clientsRoutes.delete('/client/:id', deleteClient);
clientsRoutes.get('/client/id/:id', getClientById);
clientsRoutes.get('/client/name/:nameClient', getClientByName);

async function getClient(req, res) {
  try {
    const clients = await ClientRepository.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}

async function createClient(req, res) {
  try {
    const newClient = req.body;
    await ClientRepository.createClient(newClient);
    res.status(StatusCodes.OK).json(newClient);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}

async function updateClient(req, res) {
  try {
    const id = req.params.id;
    const updatedClient = req.body;
    await ClientRepository.updateClient(id, updatedClient);
    res.status(StatusCodes.OK).json(updatedClient);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}

async function deleteClient(req, res) {
  try {
    const id = req.params.id;
    await ClientRepository.deleteClient(id);
    res.status(StatusCodes.OK).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}

async function getClientById(req, res) {
  try {
    const index = req.params.id;
    const client = await ClientRepository.getClientById(index);
    if (!client || client.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error);
  }
}

async function getClientByName(req, res) {
  const name = req.params.nameClient;
  try {
    const client = await clientRepository.getClientByName(name);
    if (!client || client.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: 'Client not found',
      });
    }
    res.json(client);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
}

export default clientsRoutes;
