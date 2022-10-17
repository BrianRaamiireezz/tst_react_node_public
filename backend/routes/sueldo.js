const express = require('express');
const sueldoController = require('../controllers/SueldoController');

const router = express.Router();

router.get('/', sueldoController.findAll);

module.exports = router;