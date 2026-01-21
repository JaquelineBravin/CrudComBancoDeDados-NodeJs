import { Router } from 'express'; // o que é o router do express? é um componente que permite criar rotas modulares e montáveis em uma aplicação Express.

const app = Router();

app.get('/products', getProducts);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);
app.get('/products/:id', getProductById);

let products = [
  { name: 'Laptop', price: 999.99, quantity: 10 },
  { name: 'Smartphone', price: 499.99, quantity: 25 },
  { name: 'Tablet', price: 299.99, quantity: 15 },
  { name: 'Headphones', price: 199.99, quantity: 30 },
  { name: 'Smartwatch', price: 199.99, quantity: 20 },
];

function getProducts(req, res) {
  res.json(products);
}

function createProduct(req, res) {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
}

function updateProduct(req, res) {
  const index = req.params.id;
  const updatedProduct = req.body;
  products[index] = updatedProduct;
  res.json(updatedProduct);
}

function deleteProduct(req, res) {
  const index = req.params.id;
  const deletedProduct = products.splice(index, 1);
  res.json(products);
}

function getProductById(req, res) {
  const index = req.params.id;
  const product = products[index];
  res.json(product);
}

export default app;
