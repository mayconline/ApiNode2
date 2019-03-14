const mongoose = require ('mongoose');

const User = mongoose.model('User');

module.exports ={

    async getAll(req,res){
        const user = await User.find();

        return res.json(user);
    }

};
