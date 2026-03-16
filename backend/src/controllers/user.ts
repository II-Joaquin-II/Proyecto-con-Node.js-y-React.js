import { Request, Response } from 'express';
import prisma from '../db/prisma'; 

// Controladores

//listado de usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// obtener usuario por id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario' });
  }
};

//crear usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, last_name, email, age } = req.body;

    if (!name || !last_name || !email || !age) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        last_name,
        email,
        age: Number(age)
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el usuario (puede que el email ya exista)' });
  }
};

// actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, last_name, email, age } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        last_name,
        email,
        age: Number(age)
      }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: 'Usuario no encontrado o error al actualizar' });
  }
};

// eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};