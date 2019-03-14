const mongoose = require ('mongoose');

const Produto = mongoose.model('Produto');

module.exports ={

    async getAll(req,res){
        const produtos = await Produto.find();
          return res.json(produtos);
    },

    async getById(req,res){
        const produtoId = await Produto.findById(req.params.id);
            return res.json(produtoId);
    },

    async cadastro(req,res){
        const cadastro = await Produto.create(req.body);
          return res.json(cadastro);
    },

    async alterar(req,res){
        const alterar = await Produto.findByIdAndUpdate(req.params.id ,req.body, {new:true});
            return res.json(alterar);
    },

    async delete(req,res){
        await Produto.findByIdAndRemove(req.params.id);
            return res.send();
    }
};
