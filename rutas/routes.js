const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const schema = mongoose.Schema;

// Esto es para poder subir un archivo desde mi pc pero falta terminarlo
//por el momento se cangan imagenes sacadas de internet
// const multer = require('multer');
// const app = express();

// // Configurar el almacenamiento de los archivos subidos
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'ruta/del/destino/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// // Crear el middleware de multer
// const upload = multer({ storage: storage });

// // Ruta para subir el archivo
// app.post('/subir', upload.single('archivo'), (req, res) => {
//   res.send('El archivo se ha subido exitosamente.');
// });

const eschemaUsuario = new schema({
  user: String,
  pass: String,
  fecha: String,
  hora: String,
  idusuario: String,
});
const eschemaProducto = new schema({
  categoria: String,
  nombre: String,
  precio: Number,
  descripcion: String,
  img: String,
  fecha: String,
  hora: String,
  idproducto: String,
});

const modeloUsuario = mongoose.model("usuario", eschemaUsuario);
const modeloProducto = mongoose.model("producto", eschemaProducto);

// route.post("/agregarproducto", (req, res) => {
//   const nuevoProducto = new modeloProducto(req.body);
//   nuevoProducto.save();
//   res.send("Se agrego el producto");
// });

route.post("/register", (req, res) => {
  modeloUsuario
    .find({ user: req.body.user })
    .then((user) => {
      res.send("El usuarioo ya existe");
    })
    .catch((err) => {
      const nuevoUsuario = new modeloUsuario(req.body);
      if (nuevoUsuario.user == "" || nuevoUsuario.pass == "") {
        res.json({
          success: false,
          message: "Por favor rellene todos los campos",
        });
      } else if (
        nuevoUsuario.user.length < 4 ||
        nuevoUsuario.pass.length > 10
      ) {
        res.send("El usuario debe tener entre 4 y 10 caracteres");
      } else {
        nuevoUsuario.save();
        res.send("Se agrego un usuario");
      }
    });
});
route.post("/login", (req, res) => {
  modeloUsuario
    .find({ user: req.body.user, pass: req.body.pass })
    .then((user) => {
      res.json({
        id: user[0].id,
        success: true,
        message: "Ingresando...",
        user: user[0].user,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "Usuario o contraseña incorrectos",
      });
    });
});

route.post("/agregarproducto", async (req, res) => {
  // console.log(req.body);
  // res.send(res.body)
  const {nombre, precio} = req.body;
  
  if(nombre && precio){
    const nuevoProducto = new modeloProducto(req.body);
    const response = await nuevoProducto.save();
    res.send({message:"Se agrego el producto"});
    console.log("Se agrego el producto");
    
  }else{
    console.log("No se agrego el producto");
    // res.send({menssage:"No se agrego el producto"});
  }
})

route.get("/mostrarproductos", (req, res) => {
  modeloProducto
    .find()
    .then((productos) => {
      if(productos.length > 0){

        res.json(productos);
        // console.log(productos.filter(producto=> producto.categoria == 'Diversos'?producto : null));
      }else{
        res.send("No existen productos"); 
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al obtener los productos");
    });
});

route.get("/mostrarproducto/:id", (req, res) => {
  const { id } = req.params;
  modeloProducto
    .findById(id)
    .then((producto) => {
      res.json(producto);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al obtener el producto");
    });
});
route.put("/actualizarproducto/:id", (req, res) => {
  const { id } = req.params;
  const { img, nombre, precio, descripcion, categoria } = req.body;
  modeloProducto
    .findByIdAndUpdate(id, { img, nombre, precio, descripcion, categoria })
    .then(() => {
      res.send("Producto actualizado correctamente");
    })
    .catch((error) => {
      res.status(500).send("Error al actualizar el producto");
    });
});

route.delete("/eliminarproducto/:id", (req, res) => {
  const { id } = req.params;
  modeloProducto
    .findByIdAndDelete(id)
    .then((res) => {
      res.send("Producto eliminado correctamente");
    })
    .catch((error) => {
      res.status(500).send("Error al eliminar el usuario");
    });
});

module.exports = route;
// const ModeloUsuario = mongoose.model('usuario', eschemaUsuario);
// const express = require('express');
// const router = express.Router()

// const mongoose = require('mongoose');
// const schema = mongoose.Schema;

// const eschemaUsuario = new schema({
//     nombre: String,
//     email: String,
//     telefono: String,
//     idusuario: String
// })
