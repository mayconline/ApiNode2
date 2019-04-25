const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const {TYPE_STORAGE} = process.env;



//objeto com os tipos de storages//
const TypeStorage = {
    //storage local //
    local: multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, path.resolve(__dirname,'..','..','tmp','fotos'));
        },
        filename:(req, file, cb)=>{
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

              file.key = `${hash.toString('hex')}-${file.originalname}`;
            
                cb(null,file.key);
            })
        }

    }),
    //storage Online //
    online: cloudinaryStorage({
        cloudinary:cloudinary,
        folder:'fotos',
        filename:(req, file, cb)=>{
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);

              file.key = `${hash.toString('hex')}-${file.originalname}`;
            
                cb(null,file.key);
            })
        },
       transformation:{quality: "auto:good"}
    })
}

module.exports ={
   
    dest: path.resolve(__dirname,'..','..','tmp','fotos'),
    storage: TypeStorage[TYPE_STORAGE],
    limits:{
        fileSize:2*1024*1024
    },
    fileFilter:(req, file,cb)=>{
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
            if(allowedMimes.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb(new Error('Formato de arquivo invalido'))
            }
    }    

    
};