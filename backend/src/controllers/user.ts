import { Request, Response } from 'express';
import { User } from '@shared/types';

// simulacion de datos
const users: User[] = [
    {
        id: 0,
        name: "Alex",
        age: 30,
    },
    {
        id: 1,
        name: "Maria",
        age: 25,
    },
    {
        id: 2,
        name: "Juan",
        age: 33,
    },
    {
        id: 3,
        name: "Luis",
        age: 22,
    },
]; 

// Controladores

//listado de usuarios
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

// obtener usuario por id
export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
};

//crear usuario
export const createUser = (req: Request, res: Response) => {
  try {
    const { name, age } = req.body as User;
    if (!name || !age) {
      return res.status(400).json({ message: 'Faltan datos' });
    }
    const newUser: User = { id: Date.now(), name, age };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el usuario' });
  }
};

// actualizar usuario
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age } = req.body as User;
  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users[userIndex] = { id: Number(id), name, age };
  res.json(users[userIndex]);
};

// eliminar usuario
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado' });
};