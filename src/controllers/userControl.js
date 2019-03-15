const User = require('../models/user');

module.exports ={

    async getAll(req,res){
        const user = await User.find();

        return res.json(user);
    }

};
