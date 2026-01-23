class Table {
  /*constructor(connection) {
    this.connection = connection;
    this.CreateTableProducts();
  }*/

  // init is a method to initialize the connection and create the table
  init(connection) {
    this.connection = connection;
    this.CreateTableProducts();
  }

  CreateTableProducts() {
    const sql = `CREATE TABLE IF NOT EXISTS products (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nameProduct VARCHAR(50) NOT NULL,
            price DOUBLE NOT NULL,
            quantity INT NOT NULL
        )`;
    this.connection.query(sql, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created successfully');
      }
    });
  }
}

export default new Table();
