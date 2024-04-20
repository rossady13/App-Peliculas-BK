const  {Router} = require('express');
const Tipo = require('../models/Tipo');
const{ validationResult, check} = require('express-validator');

const router = Router();

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function(req, res){

    try {

        const erros = validationResult(req);
         if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }

        let tipo = new Tipo();
            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;
            tipo.fechaCreacion = new Date;
            tipo.fechaActualizacion = new Date;

            tipo = await tipo.save();
            res.send(tipo);
        

    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error'); 
    }
});


  //Listar tipo

router.get('/', async function(req, res){
    try {
        const tipo = await Tipo.find();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear tipo');    
    }

} );

//Actualizar Tipo
router.put('/:tipoId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let tipo = await Tipo.findById(req.params.tipoId)
        if(!tipo){
            return res.status(400).send('Usuario no existe');
        }
    

        
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar tipo');
    }
    
  });




module.exports = router;