const mongoose = require ('mongoose');

const produtoSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
    },
    valor:{
        type:Number,
        required:true,
    },
    createDate:{
        type:Date,
        default:Date.now,
    },
});

mongoose.model('Produto', produtoSchema);