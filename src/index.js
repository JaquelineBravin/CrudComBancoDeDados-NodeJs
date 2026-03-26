import 'dotenv/config';
import express from 'express';
import connection from './sql/connection.js';
import table from './sql/table.js';
import authRoute from './routes/auth-routes.js';
import userRoutes from './routes/user-routes.js';
import clientsRoutes from './routes/clients-routes.js';

table.init(connection);

const app = express();
const port = 3000;
app.use(express.json());

app.use(userRoutes);
app.use(authRoute);
app.use(clientsRoutes);

app.listen(port);
