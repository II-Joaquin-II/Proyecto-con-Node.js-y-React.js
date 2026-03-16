import 'dotenv/config';
import express from 'express';
import cors from 'cors'; 
import * as UserController from './controllers/user'; 

const app = express();
// middlewares
app.use(cors()); 
app.use(express.json());

// ruta de prueba
app.get('/api', (req, res) => res.json('Hola API conectada'));

//operaciones de usuarios CRUD 
app.get('/api/users', UserController.getUsers);
app.get('/api/users/:id', UserController.getUserById);
app.post('/api/users', UserController.createUser);
app.put('/api/users/:id', UserController.updateUser);
app.delete('/api/users/:id', UserController.deleteUser);

// iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));