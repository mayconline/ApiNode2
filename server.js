const express = require ('express');
const mongoose = require ('mongoose');

const app = express();
//converte em json
app.use(express.json());

//conecta ao mongo
mongoose.connect('mongodb://localhost:27017/testeNode',
{useNewUrlParser:true}
);

//carrega os Models
require('./src/models/produto');
require('./src/models/user');

//carrega rotas
app.use('/api', require('./src/routes/routes'));

//lista o server na porta
app.listen(3000);