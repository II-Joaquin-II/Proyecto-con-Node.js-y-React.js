import express from 'express';
import users from './data/users';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

//prueba
app.get('/api', (req, res) => {
  res.json('Hola');
});

//lista usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

//buscar usuario por id
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  res.json(user);
});

//crear usuario
app.post('/api/users', (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newUser = {
      id: Date.now(),
      name,
      age,
    };

    users.push(newUser);
    console.log('Usuario guardado con exito', newUser);

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el usuario' });

  }

});

//editar usuario
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

});

//eliminar usuario
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado' });

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));