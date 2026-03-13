import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import * as UserController from '../controllers/user';

const app = express();
app.use(express.json());

// rutas de los endpoints de usuario
app.get('/api/users', UserController.getUsers);
app.get('/api/users/:id', UserController.getUserById);
app.post('/api/users', UserController.createUser);
app.put('/api/users/:id', UserController.updateUser);
app.delete('/api/users/:id', UserController.deleteUser);

//test para el endpoint GET /api/users
describe('GET /api/users', () => {
  it('debe retornar una lista de usuarios con el formato correcto', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    // Verificar que cada usuario tenga las propiedades esperadas
    if (response.body.length > 0) {
      const user = response.body[0];
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('last_name'); 
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('age');   
    }
  });
});

//test para el endpoint GET /api/users/:id
describe('GET /api/users/:id', () => {
  it('debe retornar un usuario específico por su ID', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('age');
  });
});

//test para el endpoint POST /api/users
describe('POST /api/users', () => {
  it('debe crear un nuevo usuario y retornar el usuario creado', async () => {
    const newUser = {
      name: 'Test',
      last_name: 'User_test',
      email: 'testuser@example.com',
      age: 30
    };

    const response = await request(app).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newUser.name);
    expect(response.body).toHaveProperty('last_name', newUser.last_name);
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).toHaveProperty('age', newUser.age);
  });
});

//test para el endpoint PUT /api/users/:id
describe('PUT /api/users/:id', () => {
  it('debe actualizar un usuario existente y retornar el usuario actualizado', async () => {
    const updatedUser = {
      name: 'Updated',
      last_name: 'User_updated',
      email: 'updateduser@example.com',
      age: 35
    };

    const response = await request(app).put('/api/users/1').send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedUser.name);
    expect(response.body).toHaveProperty('last_name', updatedUser.last_name);
    expect(response.body).toHaveProperty('email', updatedUser.email);
    expect(response.body).toHaveProperty('age', updatedUser.age);
  });
});

//test para el endpoint DELETE /api/users/:id
describe('DELETE /api/users/:id', () => {
  it('debe eliminar un usuario existente y retornar un mensaje de éxito', async () => {
    const response = await request(app).delete('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Usuario eliminado');
  });
});