/*const express = require('express');
const router = express.Router();

const multer = require('multer');

const multerConfig = require('../midlewares/multer');

const FotoControl = require('../controllers/FotoControl');


router.post('/post', multer(multerConfig).single('file'), FotoControl.post);
router.get('/', FotoControl.getAll);
router.delete('/:id', FotoControl.delete);

module.exports = router; */