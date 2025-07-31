import mongoose from "mongoose";
const schema = mongoose.Schema;

const eschemaUsuario = new schema({
  user: String,
  pass: String,
  fecha: String,
  hora: String,
  idusuario: String,
});

const modeloUsuario = mongoose.model("usuario", eschemaUsuario);

module.export = modeloUsuario;