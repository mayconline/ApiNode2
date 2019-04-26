const express = require('express');
const router = express.Router();
const multer = require('multer');

const ProdutoControl = require ('../controllers/ProdutoControl');
const FotoControl = require('../controllers/FotoControl');

const {verificarToken} = require('../midlewares/auth');
const multerConfig = require('../midlewares/multer');

router.get('/fotos', FotoControl.getAll);
router.get('/busca', ProdutoControl.busca);
router.get('/', verificarToken, ProdutoControl.getAll);
router.get('/:id', ProdutoControl.getById);
router.post('/cadastro', ProdutoControl.cadastro);
router.put('/:id', ProdutoControl.alterar);
router.delete('/:id', ProdutoControl.delete);


router.post('/cadastro/:id/fotos', multer(multerConfig).single('file'), FotoControl.post);

router.delete('/fotos/:id', FotoControl.delete);

module.exports = router;