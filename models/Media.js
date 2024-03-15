const { Schema, model} = require('mongoose');

const mediaSchema = Schema({
   
    serial: {
        type: String,
        required: true, 
        unique: true
    },
    titulo:{
        type: String,
        required: true
    },
    sipnosis: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true
    },
    fechaCreacion: {
         type: Date, required:true
    },
    fechaActualizacion: {
         type: Date, required:true},
    añoEstreno: {
        type: String,
        required: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'GeneroPrincipal',
        required: true
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'DirectorPrincipal',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    }
    
  });

  module.exports = model('Media', mediaSchema)