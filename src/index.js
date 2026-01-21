import express from 'express';
import userRoutes from './routes/users-route.js';

const app = express();
const port = 3000;
app.use(express.json());

app.use(userRoutes);

app.listen(port);
