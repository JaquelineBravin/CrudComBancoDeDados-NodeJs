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
    await productRepository.createProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateProduct(req, res) {
  try {
    const index = req.params.id;
    const updatedProduct = req.body;
    await productRepository.updateProduct(index, updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteProduct(req, res) {
  try {
    const index = req.params.id;
    await productRepository.deleteProduct(index);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getProductById(req, res) {
  try {
    const index = req.params.id;
    const product = await productRepository.getProductById(index);
    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default app;
