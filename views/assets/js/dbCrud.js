async function serverConnect(uri) {
    // Constante para utilizar mongoDB
    const mongoCliente = require('mongodb').MongoClient;
    //ubicacion de la entidadbase de mongo:
    const mongoAtlas = uri;
    //Conectarse a mongo db
    await mongoCliente.connect(mongoAtlas, (error, db) =>{
    if (error) {
        console.log('Conexion con error: '+error);
    }
    else{
        console.log('Sistema conectado a DB');
    }
});
};
//-------------------------------------------------------------------------------------
// CRUD:
//-------------------------------------------------------------------------------------
function createCollection(entidad,col) {
    // seteamos la base de datos elegida:
    const dbo = db.db(entidad);

    // creamos la coleccion:
    dbo.createCollection(col, (error, result) => {
        if (error) {
            console.log('Conexion con error: '+error);
        }
        else{
            console.log('Coleccion creada. '+result);
        }
    });
};
//-----------------------------------------------------------------
// Insertar muchos:
function insertMany(entidad,col,dato){ 
    // seteamos la base de datos elegida:
    const dbo = db.db(entidad);

    dbo.collection(col).insertMany(dato, (error, result) => {
        if (error) {
            alert('Tuvimos un error al ingresar tu dato '+ error);
            throw error;
        }
        else{
            console.log('Insertamos '+ result.insertedCount+" datos.");
        }
    });
};
//-----------------------------------------------------------------
// Insertar uno:
function insertOne(entidad,col,dato){
        // seteamos la base de datos elegida:
        const dbo = db.db(entidad);

        dbo.collection(col).insertOne(dato);
};
//-----------------------------------------------------------------
// Insertar encontrar uno:
function findOne(entidad,col) {
    // seteamos la base de datos elegida:
    const dbo = db.db(entidad);

    dbo.collection(col).findOne({},(error, result) => {
        if (error) {
            throw error;
        }
        else{
            console.log('Los datos son: \b'+ result.nombre);
        }
    });
};
//-----------------------------------------------------------------
// Encontrar muchos:
function find(entidad, col) {
    //Seteamos la base de datos elegida
    const dbo = db.db(entidad);

    //Insertamos un dato
    dbo.collection(col).find({}).toArray((error, result) => {
        if (error) {
            throw error;
        }else{
            console.log(result);
        }
    });
};
//-----------------------------------------------------------------
// Eliminar coleccion:
function drop(entidad, col) {
    const dbo = db.db(entidad);
    dbo.collection(col).drop((error, result) => {
        if (error) throw error;
        if (result) console.log(`Hemos eliminado la colección ${col}`);
        
    });
};
//-----------------------------------------------------------------
// Eliminar uno:
function deleteOne(entidad, col, dato) {
    const dbo = db.db(entidad);
    dbo.collection(col).deleteOne(dato, (error, result) => {
        if (error) {
            throw error;
        }else{
            console.log('Hemos eliminado 1 documento.');
        }
    }); 
};
//-----------------------------------------------------------------
// Eliminar muchos:
function deleteMany(entidad,col,dato) {
    const dbo = db.db(entidad);
    dbo.collection(col).deleteMany(dato, (error, result) => {
        if (error) {
            throw error;
        }else{
            console.log('Hemos eliminado todos los documentos.');
        }
    }); 
}
//-----------------------------------------------------------------
// Actualizar uno:
function updateOne(entidad,col,dato,nuevoDato) {
    const dbo = db.db(entidad);
    dbo.collection(col).updateOne(dato, nuevoDato, (error, result) => {
        if (error) {
            throw error;
        }else{
            console.log('Hemos actualizado 1 documento.');
        }
    }); 
}
//-----------------------------------------------------------------
// Actualizar muchos:
function updateMany(entidad,col,dato,nuevoDato) {
    const dbo = db.db(entidad);
    dbo.collection(col).updateMany(dato, nuevoDato, (error, result) => {
        if (error) {
            throw error;
        }else{
            console.log('Hemos actualizado 1 documento.');
        }
    });
}
console.log('[ dbCrud -> Operative ]');
//-----------------------------------------------------------------
// Exportar funciones:
//-----------------------------------------------------------------
exports.serverConnect = serverConnect;
exports.updateOne = updateOne;
exports.updateMany = updateMany;
exports.deleteMany = deleteMany;
exports.deleteOne = deleteOne;
exports.drop = drop;
exports.find = find;
exports.findOne = findOne;
exports.insertMany = insertMany;
exports.insertOne = insertOne;
exports.createCollection = createCollection;