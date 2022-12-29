const express = require('express');
const sueldoController = require('../controllers/SueldoController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, sueldoController.findAll);

module.exports = router;