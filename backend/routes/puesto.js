const express = require('express');
const puestoController = require('../controllers/PuestoController');

// Middleware
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, puestoController.create);
router.get('/', auth, puestoController.findAll);

module.exports = router;