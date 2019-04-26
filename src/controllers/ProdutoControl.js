const Produto = require('../models/produto');
const Fotos = require('../models/Fotos');
const {TYPE_STORAGE} = process.env;
const cloudinary = require('cloudinary');

const fs = require('fs');
const path = require('path');

module.exports ={

    
    async getAll(req,res){
        try{
            const produtos = await Produto.find().sort('-createdAt')
            .populate('fotos', 'url');

            return res.json(produtos);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        }
     
    },

    async getById(req,res){
        try{
            const produtoId = await Produto.findById(req.params.id)
                .populate({
                    path:'fotos',
                    options:{sort:{createdAt: -1}}
                });


                
                
                

           return res.json(produtoId);
        }
        catch(e){
            return res.status(404).send(`${e} Não foi Encontrado`);
        };
        
    },

    async cadastro(req,res){
        try{
            const cadastro = await Produto.create(req.body);
            
            //emite evento socket.io
            req.io.emit('cadastro', cadastro);
            
            return res.json(cadastro);
            
        }
        catch(e){
            return res.status(400).send({error:`${e} Verifique os dados digitados`});
            
        };
    },

    async alterar(req,res){
        try{
            const alterar = await Produto.findByIdAndUpdate(req.params.id ,req.body, {new:true});
            return res.json(alterar);
        }
        catch(e){
            return res.status(400).send(`${e} Favor verifique os dados digitados`);
        };  
        
    },

    async delete(req,res){
        try{

                //busco o produto pelo id e populo com as foto//
            const produtoId = await Produto.findById(req.params.id)
            .populate('fotos');

            
            //procura os id das fotos no array do produto
           for(prod of produtoId.fotos){
               //procura cada foto 
            let foto = await Fotos.findById(prod._id);
                
                if(TYPE_STORAGE == 'online') {
                        //deleta foto do servidor
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
              
                    //deleta a foto do mongo
                await foto.remove();
            }
            
          
            //remove o produto
            await Produto.findByIdAndRemove(req.params.id);
            return res.send("Produto Removido com Sucesso");
        }   
        catch(e){
            return res.status(400).send(`${e} Não foi encontrado`);
      };
        
    },

    async busca(req,res){
       
       try{
        const busca = await Produto.find({titulo:req.body.titulo});
        return res.json(busca);

       }
       catch(e){
        return res.status(400).send(`${e} Houve um erro de Processamento`);
       };
        

    }
};
