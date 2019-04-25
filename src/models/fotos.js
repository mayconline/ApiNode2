const mongoose = require('mongoose');

const {APP_URL} = process.env;




const fotoSchema = new mongoose.Schema({
    name:String,
    size:Number,
    key:String,
    url:String,
    public_id:String
    
},
{timestamps:true}
);

fotoSchema.pre('save', function(next){
    if(!this.url && this.key!=undefined){
        this.url = `${APP_URL}/files/${this.key}`; 
        return next();
    }
    return next();

}); 


module.exports = mongoose.model('Fotos', fotoSchema);