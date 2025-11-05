require('./tracing'); 
const express = require('express');
const cors = require('cors');
const { User } = require('./models');
const app = express();
const corsOptions = {
  origin: 'https://5q8m79-3000.csb.app', // dominio de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password
    });
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error al registrar usuario',
      details: error.message
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "username", "email"] });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3000');
});