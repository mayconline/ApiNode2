const mongoose = require ('mongoose');

const produtoSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required:true,
        unique:true
    },
    descricao:{
        type:String,
        required:true,
    },
    valor:{
        type:Number,
        required:true,
    },
}, {timestamps:true}
    );

module.exports = mongoose.model('Produto', produtoSchema);