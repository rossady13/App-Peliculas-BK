const  {Router} = require('express');
const Productora = require('../models/Productora');
const{ validationResult, check} = require('express-validator');

const router = Router();

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('slogan', 'invalid.descripcion').not().isEmpty(),
], async function(req, res){

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});
        }

        let productora = new Productora();
            productora.nombre = req.body.nombre;
            productora.estado = req.body.estado;
            productora.descripcion = req.body.descripcion;
            productora.slogan = req.body.slogan;
            productora.fechaCreacion = new Date;
            productora.fechaActualizacion = new Date;

            productora = await productora.save();
            res.send(productora);
        

    
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error'); 
    }
});


  //Listar productora

router.get('/', async function(req, res){
    try {
        const productora = await Productora.find();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al crear productora');    
    }

} );

//Actualizar Productora
router.put('/:productoraId',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),

], async function (req, res) {

    try {

        const erros = validationResult(req);
        if(!erros.isEmpty()){
            return res.status(400).json({mensaje: erros.array()});

        }  

        let productora = await Productora.findById(req.params.productoraId)
        if(!productora){
            return res.status(400).send('Usuario no existe');
        }
    

        
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrido un error al actualizar productora');
    }
    
  });




module.exports = router;