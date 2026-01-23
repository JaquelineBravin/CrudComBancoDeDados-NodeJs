import express from 'express';
import userRoutes from './routes/users-route.js';
import connection from './sql/connection.js';
import table from './sql/table.js';

table.init(connection);

const app = express();
const port = 3000;
app.use(express.json());

app.use(userRoutes);

app.listen(port);
