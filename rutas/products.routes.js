import express from "express";
const route = express.Router();
import modeloProducto from '../models/products.modules.js';


route.post("/agregarproducto", async (req, res) => {
  
  const { img ,nombre,precio, descripcion, categoria } = req.body;
  
  if(img && nombre && precio && descripcion && categoria){
    const nuevoProducto = new modeloProducto(req.body);
    const response = await nuevoProducto.save();
    res.send({message:"Se agrego el producto",payload:response});
    console.log("Se agrego el producto");
    
  }else{
    console.log("No se agrego el producto");
    res.send({menssage:"No se agrego el producto"});
  }
})

route.get("/mostrarproductos", (req, res) => {
  modeloProducto
    .find()
    .then((productos) => {
      if(productos.length > 0){

        res.json(productos);
        console.log(productos._id);
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

export default route;
