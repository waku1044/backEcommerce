// const express = require("express");
// const server = express();
// const cors = require('cors');
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3000 ;
// Habilitar CORS para todas las rutas
// server.use(cors());
// server.use(express.json());
app.use(cors());
app.use(express.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

//Esto es lo que nos hacve conectar a la base de mongodb
// Importar conexion MongoDB
// const archivoDB = require("./conexion");
const archivodb = require('./conexion');

// Importacion del archivo de rutas y modelo usuario
// const rutaUsuario = require('./backend/usuario');
// server.use('/api/usuario', rutaUsuario);
const rutas = require('./rutas/routes');
app.use('/api', rutas);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}!`);    
})










// Importar Body-parser
// const bodyParser = require('body-parser');
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended:'true'}));


// Configurar las rutas '/' es la principal
// server.get("/", (req, res) => {
//   res.end("<h1>Mensaje de NodeJS y Express</h1>");
// });
// // Configurar servidor basico = levanta servidor en porto 5000
// server.listen(5000, () => {
//   console.log("El servidor NodeJS esta corriendo ok.");
// });
