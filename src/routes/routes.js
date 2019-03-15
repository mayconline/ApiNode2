const express = require('express');
const router = express.Router();

const ProdutoControl = require ('../controllers/ProdutoControl');
const UserControl = require ('../controllers/userControl');


router.get('/produtos', ProdutoControl.getAll);
router.get('/produtos/:id', ProdutoControl.getById);
router.post('/produtos', ProdutoControl.cadastro);
router.put('/produtos/:id', ProdutoControl.alterar);
router.delete('/produtos/:id', ProdutoControl.delete);

router.get('/quantidade', ProdutoControl.contador);

router.get('/user', UserControl.getAll);


module.exports = router;