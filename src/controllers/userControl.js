const User = require('../models/user');
const bcrypt = require('bcrypt');
const {gerarToken} = require('../midlewares/auth');


module.exports ={

    async getAll(req,res){
        const user = await User.find();
            return res.json(user);

            //exemplo pegando o userId pelo token
     // const user = await User.find({_id:req.userId})
      //  return res.send({userId:req.userId, user})
    },
    
    async getId(req,res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async registro (req, res){

        const {usuario} = req.body;
            

        try {
            const user = await User.findOne({usuario});
                if(user) return res.send('usuario ja cadastrado');

            const registro = await User.create(req.body);

            const jwtToken = await gerarToken(registro._id);
             
            return res.send({registro, jwtToken})
        }

        catch(e) {
            return res.send(`Faltam Dados para Registro ${e}`)
        }        
        
    },

    async login(req, res) {
        const {usuario, senha} = req.body;

        if(!usuario || !senha) return res.status(400).send("Favor insira os dados de login");

        try {

            const user = await User.findOne({usuario}).select('+senha');
                 if(!user) return res.status(401).send('usuario nao registrado');

            const logado = await bcrypt.compare(senha, user.senha);
                if(!logado) return res.status(401).send('Senha Invalida');

             user.senha = undefined;

            const jwtToken = await gerarToken(user._id);
            
                return res.send({user, jwtToken, status:`${user.nome} está online`});
              

        }

        catch(e) {
            return res.status(400).send(`Erro ao buscar o usuario ${e}`);
        }
    }
};
