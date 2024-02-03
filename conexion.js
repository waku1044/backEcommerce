// const mongoose = require('mongoose');
require ('dotenv').config();
const mongoose = require('mongoose');
const conex = process.env.MONGO || 'mongodb://127.0.0.1:27017/e-commerce';
mongoose.connect(conex);  

// const objetdb = mongoose.connection
const objetdb = mongoose.connection;


// objetdb.on('connected',()=>{console.log('Conexión correcta a MongoDB')})
objetdb.on('open', () => {
    console.log('Base de datos Monogodb conectada');
})
// objetdb.on('error',()=>{console.log('Error en la conexión de MongoDB')})
objetdb.on('error', () => {
    console.log('Error de conexion');
})

// module.exports = mongoose
module.exports = mongoose;




