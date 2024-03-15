const  {Router} = require('express');
const Media = require('../models/Media');
const{ validationResult, check} = require('express-validator');

const router = Router();

//crear media
router.post('/',[

        check('serial', 'invalid.serial').not().isEmpty(),
        check('titulo', 'invalid.titulo').not().isEmpty(),
        check('sipnosis', 'invalid.sipnosis').not().isEmpty(),
        check('URL', 'invalid.URL').not().isEmpty(),
        check('foto', 'invalid.foto').not().isEmpty(),
        check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
        check('generoPrincipal','invalid.generoPrincipal').not().isEmpty(),
        check('directorPrincipal','invalid.directorPrincipal').not().isEmpty(),
        check('productora','invalid.productora').not().isEmpty(),
        check('tipo','invalid.tipo').not().isEmpty(),


], async function(req, res){

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
         const existeMediaPorSerial =await Media.findOne({serial: req.body.serial});

         if(existeMediaPorSerial){
            return res.status(400).send('ya existe serial para otro equipo');
         }
        
         let media = new Media();

            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sipnosis = req.body.sipnosis;
            media.URL = req.body.URL;
            media.foto = req.body.foto;
            media.añoEstreno = req.body.añoEstreno;
            media.generoPrincipal = req.body.generoPrincipal;
            media.directorPrincipal = req.body.directorPrincipal;
            media.productora = req.body.productora;
            media.tipo = req.body.tipo;
            media.fechaCreacion = new Date;
            media.fechaActualizacion = new Date;

            media = await media.save();
            res.send(media);
    
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error en media'); 
    }
});
//LISTAR
router.get('/', async function(req, res){
    try {
        const media = await Media.find();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear media');    
    }

});
//actualizar
router.put('/:mediaId',[
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sipnosis', 'invalid.sipnosis').not().isEmpty(),
    check('URL', 'invalid.URL').not().isEmpty(),
    check('foto', 'invalid.foto').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('generoPrincipal','invalid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal','invalid.directorPrincipal').not().isEmpty(),
    check('productora','invalid.productora').not().isEmpty(),
    check('tipo','invalid.tipo').not().isEmpty(),
], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let media = await Media.findById(req.params.mediaId)
        if(!media){
            return res.status(400).send('Usuario no existe');
        }
    

        
            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sipnosis = req.body.sipnosis;
            media.URL = req.body.URL;
            media.foto = req.body.foto;
            media.añoEstreno = req.body.añoEstreno;
            media.generoPrincipal = req.body.generoPrincipal;
            media.directorPrincipal = req.body.directorPrincipal;
            media.tipo = req.body.tipo;
            media.productora = req.body.productora;
            media.fechaCreacion = new Date;
            media.fechaActualizacion = new Date;

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar media');
    }
    
  });

    
module.exports = router;
