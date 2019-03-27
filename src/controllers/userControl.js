const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports ={

    async getAll(req,res){
        const user = await User.find();

        return res.json(user);
    },
    
    async getId(req,res){
        const user = await User.findById(req.params.id);

        return res.json(user);
    },

    async registro (req, res){
        const registro = await User.create(req.body);
        
        return res.json(registro)
    },

    async login(req, res) {
        const {usuario, senha} = req.body;

        if(!usuario || !senha) return res.send("Favor insira os dados de login");

        try {

        const user = await User.findOne({usuario}).select('+senha');

        if(!user) return res.send('usuario nao registrado');

        const logado = await bcrypt.compare(senha, user.senha);
        if(!logado) return res.send('Senha Invalida');

        user.senha = undefined;
        return res.send(`${user.nome} está logado`);

        }

        catch(e) {
            return res.send(`Erro ao buscar o usuario ${e}`);
        }
    }
};
