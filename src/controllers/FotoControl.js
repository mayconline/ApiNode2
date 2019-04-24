const Fotos = require('../models/fotos');

const fs = require('fs');
const path = require('path');

module.exports={
   async post(req, res) {

        //local url = path//

        const {originalname, size, key, url=''} = req.file;

        const fotos = await Fotos.create({  
            name: originalname,
            size,
            key,
            url
          
        })


        return res.json(fotos);
    },

    async getAll(req, res){
        const fotos = await Fotos.find();

        return res.json(fotos);
    },

    async delete(req,res){
        let foto = await Fotos.findById(req.params.id);
        let caminho =  await path.resolve(__dirname,'..','..','tmp','fotos', foto.key);
     
                //verifica se existe esse caminho
         await  fs.access(caminho, (err)=>{
            if(!err) {
                //deleta a foto do caminho
                fs.unlink(caminho, err =>{
                    if(err) console.log(err);
                })
            }
        });
        
        await Fotos.remove();

        return res.send('foto excluida com sucesso')
    }
}