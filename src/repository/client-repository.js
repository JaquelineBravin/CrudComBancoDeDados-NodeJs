import connection from '../sql/connection.js';
import Client from '../model/client-model.js';
import { BadRequestError, NotFoundError } from '../../utils/api-errors.js';

class ClientRepository {
  async getAllClients() {
    const sql = `SELECT * FROM agenda`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async createClient(Client) {
    const existingClient = await this.getClientByName(Client.nameClient);
    if (existingClient && existingClient.length > 0)
      throw new BadRequestError('Client already exists');

    if (
      !Client.nameClient ||
      !Client.contact ||
      !Client.proceidure ||
      !Client.deadline ||
      !Client.price
    )
      throw new BadRequestError('Missing required fields');

    const sql = `INSERT INTO agenda (nameClient, contact, proceidure, deadline, price) VALUES (?, ?, ?, ?, ?)`;
    const values = [
      Client.nameClient,
      Client.contact,
      Client.proceidure,
      Client.deadline,
      Client.price,
    ];

    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async updateClient(id, Client) {
    const existingClient = await this.getClientById(id);
    if (!existingClient || existingClient.length === 0)
      throw new NotFoundError('Client not found');

    const sql = `UPDATE agenda SET nameClient = ?, contact = ?, proceidure = ?, deadline = ?, price = ? WHERE id = ?`;
    const values = [
      Client.nameClient,
      Client.contact,
      Client.proceidure,
      Client.deadline,
      Client.price,
      id,
    ];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async deleteClient(id) {
    const existingClient = await this.getClientById(id);
    if (!existingClient || existingClient.length === 0)
      throw new NotFoundError('Client not found');

    const sql = `DELETE FROM agenda WHERE id = ?`;
    const values = [id];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getClientById(id) {
    const sql = `SELECT * FROM agenda WHERE id = ?`;
    const values = [id];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getClientByName(nameClient) {
    const sql = `SELECT * FROM agenda WHERE nameClient = ?`;
    const values = [nameClient];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default new ClientRepository();
