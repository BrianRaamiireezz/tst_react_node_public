const express = require('express');
const empleadoController = require('../controllers/EmpleadoController');
const auth = require('../middleware/auth');

const router = express.Router();

// Agregar ", auth"

router.post('/', auth, empleadoController.create);

router.get('/', empleadoController.findAll);

router.put('/:id', auth, empleadoController.updateOne);
router.delete('/:id', auth, empleadoController.deleteOne);

module.exports = router;