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
mongoose.connect('mongodb://localhost:27017/testeNode',
{useNewUrlParser:true}
);

//socket.io
app.use((req,res,next)=>{
    req.io = io;
        return next();
});

//carrega rotas
app.use('/api', require('./src/routes/routes'));

//lista o server na porta
//app.listen(3000);
//lista o server com socket.io
server.listen(3000);