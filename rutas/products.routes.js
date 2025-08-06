import express from "express";
import { agregarProducto, mostrarProductos, productoPorId, actualizarProducto, eliminarProducto } from '../controllers/products.controllers.js';



const route = express.Router();


 route.post("/agregarproducto", agregarProducto)

 route.get("/mostrarproductos", mostrarProductos);

route.get("/mostrarproducto/:id", productoPorId );

route.put("/actualizarproducto/:id", actualizarProducto );

route.delete("/eliminarproducto/:id", eliminarProducto);

export default route;
