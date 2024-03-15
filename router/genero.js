const  {Router} = require('express');
const Genero = require('../models/Genero');
const{ validationResult, check} = require('express-validator');

const router = Router();

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function(req, res){

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }

        let genero = new Genero();
            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;
            genero.fechaCreacion = new Date;
            genero.fechaActualizacion = new Date;

            genero = await genero.save();
            res.send(genero);
        

    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error'); 
    }
});


  //Listar generos

router.get('/', async function(req, res){
    try {
        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear generos');    
    }

} );

//Actualizar Genero
router.put('/:generoId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let genero = await Genero.findById(req.params.generoId)
        if(!genero){
            return res.status(400).send('Usuario no existe');
        }
    

        
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar genero');
    }
    
  });




module.exports = router;