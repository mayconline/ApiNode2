const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({

    nome: {
        type:String,
        required:true,
    },
    idade:{
        type:Number,
        required:true,
    },
     createDate:{
        type:Date,
        default:Date.now,
    },
    
});

module.exports = mongoose.model('User', userSchema);