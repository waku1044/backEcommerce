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

const listaOrigin = ['http://localhost:5173','https://back-ecommerce-olive.vercel.app/']// o una lista de dominios permitidos
const corsOptions = {
  origin: function (origin, callback) {
    // Permite solicitudes sin origin (por ejemplo, desde herramientas como Postman)
    if (!origin || listaOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000 ;
// Habilitar CORS para todas las rutas



app.use(express.json());




app.use('/api', rutasClients)
app.use('/api', rutasProducts);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}!`);    
})