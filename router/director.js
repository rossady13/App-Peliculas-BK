const  {Router} = require('express');
const Director = require('../models/Director');
const{ validationResult, check} = require('express-validator');

const router = Router();

//Crear Director

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),

], async function (req, res) {

    try {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }
        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save();
        res.send(director);

    } catch (error) {
        console.log(error);
    }
    
  });

  //Listar director

  router.get('/', async function(req, res){
    try {
        const director = await Director.find();
        res.send(director);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear director');    
    }
    
} );
//Actualizar Director
router.put('/:directorId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let director = await Director.findById(req.params.directorId)
        if(!director){
            return res.status(400).send('Usuario no existe');
        }
    

        
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save();
        res.send(director);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar director');
    }
    
  });

  module.exports = router;


