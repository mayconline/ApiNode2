const mongoose = require ('mongoose');

const Produto = mongoose.model('Produto');

module.exports ={

    async getAll(req,res){
        try{
            const produtos = await Produto.find().sort('createDate');
            return res.json(produtos);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        }
     
    },

    async getById(req,res){
        try{
            const produtoId = await Produto.findById(req.params.id);
            return res.json(produtoId);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        };
        
    },

    async cadastro(req,res){
        try{
            const cadastro = await Produto.create(req.body);
            return res.json(cadastro);
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };
    },

    async alterar(req,res){
        try{
            const alterar = await Produto.findByIdAndUpdate(req.params.id ,req.body, {new:true});
            return res.json(alterar);
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },

    async delete(req,res){
        try{
            await Produto.findByIdAndRemove(req.params.id);
            return res.send("Produto Removido com Sucesso");
        }   
        catch(e){
            return res.status(400).send(`${e} Não foi encontrado`);
        };
        
    }
};
