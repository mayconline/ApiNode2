const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    nome: {
        type:String,
        required:true,
    },
    usuario:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    senha:{
        type:String,
        required:true,
        select:false,
        trim:true
    },
},
{timestamps:true}

);

userSchema.pre('save', async function(next){
    let user = this;

    if(!user.isModified('senha')) return next();

    user.senha = await bcrypt.hash(user.senha, 10);
    return next();


});

module.exports = mongoose.model('User', userSchema);