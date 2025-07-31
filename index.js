import express from "express";
import cors from 'cors';
// Importacion del archivo de rutas y modelo usuario
// const rutaUsuario = require('./backend/usuario');
// server.use('/api/usuario', rutaUsuario);
import rutasProducts from './rutas/products.routes.js';
import rutasClients from './rutas/clients.routes.js';

//Esto es lo que nos hacve conectar a la base de mongodb
// Importar conexion MongoDB
// const archivoDB = require("./conexion");
import archivodb from './db/conexion.js';
archivodb
const app = express();
const port = process.env.PORT || 3000 ;
// Habilitar CORS para todas las rutas



app.use(express.json());
app.use(cors());




app.use('/api', rutasClients)
app.use('/api', rutasProducts);

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
