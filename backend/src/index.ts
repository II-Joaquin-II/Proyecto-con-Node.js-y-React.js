import express from 'express';
import users from './data/users';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.get('/api', (req, res) => {
  res.json('Hola');
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));