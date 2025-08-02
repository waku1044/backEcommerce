import bcrypt from 'bcrypt';
import modeloUsuario from '../models/clients.modules.js';

export const registro = async (req, res) => {
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

    const nuevoUsuario = new modeloUsuario({
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


export const login = async (req, res) => {
  try {
    // Buscar el usuario en la base de datos por el nombre de usuario
    const user = await modeloUsuario.findOne({ user: req.body.user });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(req.body.pass, user.pass);

    if (!passwordMatch) {
      return res.status(404).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    // Si todo es correcto, se responde con los datos del usuario
    return res.status(200).json({
      id: user.id,
      success: true,
      message: "Ingresando...",
      user: user.user,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error en servidor',
      error,
    });
  }
};


