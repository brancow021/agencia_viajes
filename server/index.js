//Importar express
const express = require('express');
const routes = require('./routes')
const path = require('path');
const body = require('body-parser');
const configs  = require ('./config')
const db = require('./config/database');
require('dotenv').config({path: 'variables.env'})


db.authenticate()
    .then(() => console.log('Db conectada'))
    .catch(err => console.log(err));

//Configurar Express
const app = express();

//Habilitar pug
app.set('view engine', 'pug')

//Añadir las vistar
app.set('views', path.join(__dirname, './views'))



// cargar una carpeta estatica llamada public
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//creamos la variable para el sitioweb
app.locals.titulo = config.nombresitio;



//Muestra el año actual y genera la ruta
app.use((req, res , next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    // console.log(res.locals)    
    return next();
})

//Ejecutamos el bodyparse
app.use(body.urlencoded({ extended: true}))

//Cargar rutas
app.use('/', routes());


//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Esta funcionado el servidor')
});

