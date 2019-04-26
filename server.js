const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require("morgan");


//arquvo de variaveis .env
const env = require('dotenv');
env.config();

//extraindo as variaveis que precisamos
const {MONGO_URL, PORT} = process.env;

const app = express();

//debug do express morgan
app.use(morgan('dev'));
//cors para acesso externo
app.use(cors());
//converte em json
app.use(express.json());
//permite envio de arquivos pro server
app.use(express.urlencoded({extended:true}));
//libera acesso externo a pasta local atraves da url
app.use('/files', express.static(path.resolve(__dirname,'tmp','fotos')));

//cria conexao socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);


//conecta ao mongo
mongoose.Promise = global.Promise;
mongoose.connect( MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, }).then(
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
//app.use('/fotos', require('./src/routes/fotoRoute'));

//lista o server na porta
//app.listen(3000);
//lista o server com socket.io
server.listen(PORT);

