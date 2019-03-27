const express = require('express');
const router = express.Router();

const UserControl = require('../controllers/userControl');

router.get('/', UserControl.getAll);
router.get('/:id', UserControl.getId);
router.post('/registro', UserControl.registro);
router.post('/login', UserControl.login);

module.exports = router;