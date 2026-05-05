import connection from '../sql/connection.js';
import User from '../model/user-model.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../../utils/api-errors.js';

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
    const existingUser = await this.getUserByName(User.nameUser);
    if (existingUser && existingUser.length > 0) {
      throw new ConflictError('User already exists');
    }

    if (!User.nameUser || !User.passwordUser) {
      throw new BadRequestError('Name and password are required');
    }

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
    const existingUser = await this.getUserById(id);
    if (!existingUser || existingUser.length === 0) {
      throw new NotFoundError('User not found');
    }

    if (!user.nameUser || !user.passwordUser) {
      throw new BadRequestError('Name and password are required');
    }

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
    const existingUser = await this.getUserById(id);
    if (existingUser && existingUser.length > 0) {
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
    } else {
      throw new NotFoundError('User not found');
    }
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

  async getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ?`;
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
}

export default new userRepository();
