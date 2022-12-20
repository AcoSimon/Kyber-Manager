//Es la configuración de la colección Users de la DB
//Importamos las librerías necesarias
const mongoose = require('mongoose'); 
const { Schema } = require('mongoose');

//Estructura de la colección:
const registroUsuario = new Schema({
    nombre: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    timestamp: {
        type: Date, 
        default: new Date()
    }
})

//Exportamos la configuración con la colección
module.exports = mongoose.model('users', registroUsuario);