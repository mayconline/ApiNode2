const express = require('express');
const router = express.Router();
const {verificarToken} = require('../midlewares/auth');

const UserControl = require('../controllers/userControl');

router.get('/', verificarToken, UserControl.getAll);
router.get('/:id', verificarToken, UserControl.getId);
router.post('/registro', UserControl.registro);
router.post('/login', UserControl.login);

module.exports = router;