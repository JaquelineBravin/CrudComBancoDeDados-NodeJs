import connection from '../sql/connection.js';
import User from '../model/user-model.js';

class userRepository {
  async getAllUsers() {
    const sql = `SELECT * FROM users`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async createUser(User) {
    const sql = `INSERT INTO users (nameUser, passwordUser) VALUES (?, ?)`;
    const values = [User.nameUser, User.passwordUser];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async updateUser(id, user) {
    const sql = `UPDATE users SET nameUser = ?, passwordUser = ? WHERE id = ?`;
    const values = [user.nameUser, user.passwordUser, id];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ?`;
    const values = [id];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async getUserByName(nameUser) {
    const sql = `SELECT * FROM users WHERE nameUser = ?`;
    const values = [nameUser];
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export default new userRepository();
