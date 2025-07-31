import mongoose from "mongoose";
const schema = mongoose.Schema;

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

const modeloProducto = mongoose.model("producto", eschemaProducto);

module.export = modeloProducto;