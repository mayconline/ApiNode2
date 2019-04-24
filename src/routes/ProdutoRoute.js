const express = require('express');
const router = express.Router();

const ProdutoControl = require ('../controllers/ProdutoControl');

const {verificarToken} = require('../midlewares/auth');


router.get('/busca', ProdutoControl.busca);
router.get('/', verificarToken, ProdutoControl.getAll);
router.get('/:id', ProdutoControl.getById);
router.post('/cadastro', ProdutoControl.cadastro);
router.put('/:id', ProdutoControl.alterar);
router.delete('/:id', ProdutoControl.delete);


module.exports = router;