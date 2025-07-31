import 'dotenv/config'; // Cargar variables de entorno
import mongoose from'mongoose';

// Obtener la URL de conexión de MongoDB desde el archivo .env
const conex = process.env.MONGO ;

// Realizar la conexión a MongoDB
mongoose.connect(conex)
.then(() => {
    console.log('Conexión exitosa a MongoDB');
})
.catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Termina el proceso si hay un error
});

// Exportar mongoose para su uso en otros archivos
module.exports = mongoose;
