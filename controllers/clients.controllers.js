import bcrypt from 'bcrypt';
import modeloUsuario from '../models/clients.modules.js';

module.exports =  registro = async (req, res) => {
  const { user, pass } = req.body;

  try {
    if (!user || !pass) {
      return res.status(400).json({
        success: false,
        message: "Por favor rellene todos los campos",
      });
    }

    if (!(user.length > 3 && user.length < 11)) {
      return res.status(400).json({
        success: false,
        message: "El usuario debe tener entre 4 y 10 caracteres"
      });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const nuevoUsuario = new modeloUsuari({
      user,
      pass: hashedPassword,
    });

    await nuevoUsuario.save();

    return res.status(201).json({
      success: true,
      message: "Se agregó un usuario",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error en servidor',
      error,
    });
  }
};


module.exports = login =  (req, res) => {
    try {
        
        modeloUsuario
          .find({ user: req.body.user, pass: req.body.pass })
          .then((user) => {
            return res.status(200).json({
              id: user[0].id,
              success: true,
              message: "Ingresando...",
              user: user[0].user,
            });
          })
          .catch((error) => {
           return  res.status(404).json({
              success: false,
              message: "Usuario o contraseña incorrectos",
            });
          });
    } catch (error) {
        return res.status(500).json({message:'Error en servidor', error})
    }
  }
