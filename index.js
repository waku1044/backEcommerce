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
import conectarDB from './db/conexion.js';
await conectarDB();

const app = express();
const port = process.env.PORT || 3000 ;
// Habilitar CORS para todas las rutas



app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Permite solicitudes solo desde este dominio
    methods: ['GET', 'POST', 'OPTIONS'], // Permite estos métodos
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite estos encabezados
  }));




app.use('/api', rutasClients)
app.use('/api', rutasProducts);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}!`);    
})