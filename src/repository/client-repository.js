import connection from '../sql/connection.js';
import Client from '../model/client-model.js';

class ClientRepository {
  async getAllClients() {
    const sql = `SELECT * FROM agenda`;
    return new Promise((resolve, reject) => {
      const { rows } = connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async createClient(Client) {
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
}

export default new ClientRepository();
