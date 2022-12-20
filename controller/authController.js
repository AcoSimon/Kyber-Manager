const Usuario = require('../models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const userCreate = async (req, res) => {

    //1. Validamos los datos que llegan
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        return res.status(422).json({
            errores: errores
        })
    }

    //Probamos el post
    const { nombre, email, password } = req.body;
    console.log(`1. ${nombre}, ${email}, ${password}`);

    //2. Verificamos si el mail no se repite
    try {
        let usuario = await Usuario.findOne({ email })
        console.log(`2. ${usuario}`); 
        
        if(usuario){
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            })
        } 

    //3. Si el mail NO se repite, creamos al Usuario
        usuario = new Usuario(req.body);
        console.log(usuario); 

    //4. Generamos la encriptación del usuario
        const salt = bcrypt.genSaltSync();
        console.log(`La encriptación automática es ${salt}`);

    //5.Mezclamos la encriptación con el password
        usuario.password = bcrypt.hashSync(password, salt);
        console.log(`3. La mezcla es: ${usuario.password}`);

        await usuario.save();

    //6. proximente token
        
    } catch (error) {
        res.status(500).json({
            "mensaje": 'Error al crear un Usuario',
            "error": error
        })
        
    }

    //5. Respuesta de el POST
    res.json({
        mensaje: 'Datos recibidos y encriptados'
    });
}



const userLogin = async (req, res) => {

    let validacion = 'Email o Contraseña incorrectos';

    //1. Recibimos los datos para el login
    const { email, password } = req.body;
    console.log(`4. Los datos son: ${email} - ${password}`);

    try {
    //2. Confirmar el email
        let usuario = await Usuario.findOne({ email });
        console.log(`5. ${usuario}`);
        if(!usuario){
            /*  return res.status(404).json({ 
                msg: 'Usuario o contraseña incorrectos'
            }) */
            return res.render('login', {
                validacion
            });
        }

    //3. Confirmamos la contraseña
        const validacionPassword = bcrypt.compareSync(password, usuario.password);
        console.log(`6. ${validacionPassword}`);

        if(!validacionPassword){
            /* return res.status(400).json({
                msg: 'Usuario o contraseña incorrectos'
            }) */
            return res.render('login', {
                validacion
            });
        }
        
        //Respuesta general
/*         res.json({
            mge: 'Usuario logueado exitosamente',
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
        }); */

        res.render('home')

    } catch (error) {
        /* res.status(500).json({
            msg: 'Error al ingresar a la aplicación'
        }) */
        res.render('login', {
            validacion
        });
    }
}

const pruebaDatos = (req, res) =>{
    let validacion = 'Email o Contraseña incorrectos';
    const { email, password } = req.body;
    console.log(`Los datos son: ${email} - ${password}`);
    res.render('login', {
        validacion
    })
}

module.exports = {
    userCreate,
    userLogin,
    pruebaDatos
}