import { Router } from 'express'; // o que é o router do express? é um componente que permite criar rotas modulares e montáveis em uma aplicação Express.
import ClientRepository from '../repository/client-repository.js';

const app = Router();

app.get('/client', getClient);
app.post('/client', createClient);
app.put('/client/:id', updateClient);
app.delete('/client/:id', deleteClient);
app.get('/client/:id', getClientById);

async function getClient(req, res) {
  try {
    const clients = await ClientRepository.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createClient(req, res) {
  try {
    const newClient = req.body;
    await ClientRepository.createClient(newClient);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateClient(req, res) {
  try {
    const index = req.params.id;
    const updatedClient = req.body;
    await ClientRepository.updateClient(index, updatedClient);
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteClient(req, res) {
  try {
    const index = req.params.id;
    await ClientRepository.deleteClient(index);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getClientById(req, res) {
  try {
    const index = req.params.id;
    const client = await ClientRepository.getClientById(index);
    res.json(client);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default app;
