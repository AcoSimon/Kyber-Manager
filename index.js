
const express = require('express');
require('dotenv').config();
require('./database/conexion');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const app = express();
const PORT = process.env.PORT || 8080;
//-------------------------------------------------------------------------------------------------------------------------
// Nombre de la empresa:
let entidad = process.env.mongoAtlasEntidad;
const uriMongo = process.env.mongoAtlasInit+process.env.mongoAtlasEntidad+process.env.mongoAtlasEnd;
//--------------------------------------------------------------------------------------------------------

// Middlewares:
app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname, '/public')));

//Configuración de Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials('views/partials', path.join(__dirname, 'views/partials'));
//-------------------------------------------------------------------------------------------------------------------------
app.use('/api', require('./router/auth'));
//-------------------------------------------------------------------------------------------------------------------------
// Direccionamientos:
app.post('/pages-login',(req, res) => {
    const { email, password } = req.body;
    console.log(email+' || '+password);
    res.redirect('pages-faq');      
});
//-------------------------------------------------------------------------------------------------------------------------
// Rutas:
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/pages-metrics', (req, res) => {
    res.render('pages-metrics');
});
app.get('/pages-news', (req, res) => {
    res.render('pages-news');
});

app.get('/pages-register', (req, res) => {
    res.render('pages-register');
    const { email, password } = req.body;
    let usuario = [email,password];
    dbCrud.insertOne(entidad,'usuarios',usuario);
});

app.get('/pages-login', (req, res) => {
    res.render('pages-login');
});

app.get('/users-profile', (req, res) => {
    res.render('users-profile');
});

app.get('/pages-faq', (req, res) => {
    res.render('pages-faq');
});

app.get('/pages-contact', (req, res) => {
    res.render('pages-contact');
});

app.get('/pages-blank', (req, res) => {
    res.render('pages-blank');
});

app.get('/figma', (req, res) => {
    res.render('figma');
});


app.get('*', (req, res) => {
    res.render('pages-error-404');
});
//-------------------------------------------------------------------------------------------------------------------------
// App en escucha por el puerto asignado:
app.listen(PORT, () => {
    console.log('\n\nURI Mongo:'+uriMongo+'\n App de '+entidad+' activa y trabajando en el puerto '+PORT);
});

// En caso de error me avisaria:
app.on('Error', (err)=>{
    console.log('Existe un error de conexion.');
    res.render('pagess-error-404');
});
//-------------------------------------------------------------------------------------------------------------------------

console.log('[ Index -> Operative ]');



