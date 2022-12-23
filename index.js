'use strict'

const express = require('express');
const app = express();
const port = 3900;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Direccion y nombre de la base de datos
const url = 'mongodb://localhost:27017/NOMBRE_PROYECTO';

// Para evitar fallos en la conexión con mongoDB
mongoose.Promise = global.Promise;

// Se cargan las rutas definidas
let routes = require('./routes/routes');

// bodyParser: middleware para analizar cuerpos de a través de la URL
app.use(bodyParser.urlencoded({ extended: false }));
// Convierte las peticiones a formato JSON
app.use(bodyParser.json());

// Configuracion de origenes, headers y metodos permitidos en peticiones a la API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// DIRECCION/RUTAS-DEFINIDAS
// localhost:3900/api/ruta
app.use('/api', routes);

app.use('/', express.static(path.join(__dirname, 'public')));

// Alta del servidor
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{
	app.listen(process.env.PORT || port, () =>{
		console.log('Servidor ejecutándose en http://localhost:' + port );
	});
});
