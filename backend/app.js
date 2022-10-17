// Core
const express = require('express');
global.db = require('./db');

// Util

// Rutas *
const puestoRoutes = require('./routes/puesto');
const userRouters = require('./routes/user');
const empleadoRoutes = require('./routes/empleado');
const sueldoRoutes = require('./routes/sueldo');

// Init
const app = express();

// Acceder a request body
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Segmentos *
app.use('/api/puesto', puestoRoutes);
app.use('/api/user', userRouters);
app.use('/api/empleado', empleadoRoutes);
app.use('/api/sueldo', sueldoRoutes);

module.exports = app;