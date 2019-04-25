const Fotos = require('../models/fotos');
const cloudinary = require('cloudinary');

const {TYPE_STORAGE} = process.env;

const fs = require('fs');
const path = require('path');

module.exports={
   async post(req, res) {

    console.log(req.file)
        //local url = path//
        //online bytes, key, secure_url , public_id //

       const {originalname, bytes:size, key, secure_url:url='', public_id} = req.file;

   
         const fotos = await Fotos.create({  
            name: originalname,
            size,
            key,
            url,
            public_id
          
        }) 


     /*  const teste = await cloudinary.image(public_id, {quality: "auto:good"})
        console.log(teste) */

        return res.json(fotos);
    },

    async getAll(req, res){
        const fotos = await Fotos.find();

        return res.json(fotos);
    },

    async delete(req,res){
        let foto = await Fotos.findById(req.params.id);

        if(TYPE_STORAGE == 'online') {
            await cloudinary.v2.uploader.destroy(foto.public_id);
        }
        else if (TYPE_STORAGE == 'local') {
     
         //verifica se a foto tem url
          if(foto.url!='')   {

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

          } 
          
        

        };
   
        await foto.remove();

        return res.send('foto excluida com sucesso')
    }
}