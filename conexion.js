// const mongoose = require('mongoose');
require ('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO)    

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




