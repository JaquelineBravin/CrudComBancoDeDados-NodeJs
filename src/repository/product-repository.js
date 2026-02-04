import connection from '../sql/connection.js';
import Product from '../model/product-model.js';

class ProductRepository {
  async getAllProducts() {
    const sql = `SELECT * FROM products`;
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

  async createProduct(Product) {
    const sql = `INSERT INTO products (nameProduct, price, quantity) VALUES (?, ?, ?)`;
    const values = [Product.name, Product.price, Product.quantity];
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

  async updateProduct(id, Product) {
    const sql = `UPDATE products SET nameProduct = ?, price = ?, quantity = ? WHERE id = ?`;
    const values = [Product.name, Product.price, Product.quantity, id];
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

  async deleteProduct(id) {
    const sql = `DELETE FROM products WHERE id = ?`;
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

  async getProductById(id) {
    const sql = `SELECT * FROM products WHERE id = ?`;
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

export default new ProductRepository();
