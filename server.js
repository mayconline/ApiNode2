const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');


const app = express();

//cors para acesso externo
app.use(cors());
//converte em json
app.use(express.json());

//cria conexao socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);


//conecta ao mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/testeNode', { useNewUrlParser: true }).then(
  () => {console.log('Conectado ao db com sucesso') },
  err => { console.log('nao foi possivel conectar a data base '+ err)}
);


//socket.io
app.use((req,res,next)=>{
    req.io = io;
        return next();
});

//carrega rotas
app.use('/', require('./src/routes/indexRoute'));
app.use('/produtos', require('./src/routes/ProdutoRoute'));
app.use('/usuarios', require('./src/routes/UserRoute'));

//lista o server na porta
//app.listen(3000);
//lista o server com socket.io
server.listen(3000);