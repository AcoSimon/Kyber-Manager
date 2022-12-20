const mongoose = require('mongoose');
require ('dotenv').config();

//2. Pasamos la url local de la ubicacion de la db de mongo y la database
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.mongoAtlasInit+process.env.mongoAtlasEntidad+process.env.mongoAtlasEnd;


const conexion = mongoose.connect(MONGOATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log(`Conexión a la Database correcta - MONGOATLAS`);
});

mongoose.connection.on('error', () =>{
    console.log(`Conexión a la Database NO encontrada - URL: ${MONGOATLAS}`);
})

module.exports = conexion;


