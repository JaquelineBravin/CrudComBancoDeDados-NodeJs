import { Router } from 'express'; // o que é o router do express? é um componente que permite criar rotas modulares e montáveis em uma aplicação Express.
import productRepository from '../repository/product-repository.js';

const app = Router();

app.get('/products', getProducts);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);
app.get('/products/:id', getProductById);

async function getProducts(req, res) {
  try {
    const products = await productRepository.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = req.body;
    /*
    esta forma está errada porque não precisa do push, pois o createProduct já insere no banco de dados
    const products = await productRepository.createProduct(newProduct);
    products.push(newProduct);
    */

    await productRepository.createProduct(newProduct);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
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
