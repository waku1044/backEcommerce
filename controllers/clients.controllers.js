import bcrypt from "bcrypt";
import modeloUsuario from "../models/clients.modules.js";

export const registro = async (req, res) => {
  const { user, pass } = req.body;

  try {
    // Verifica que los campos no estén vacíos
    if (!user || !pass) {
      return res.status(400).json({
        success: false,
        message: "Por favor rellene todos los campos",
      });
    }

    // Verifica que el nombre de usuario tenga entre 4 y 10 caracteres
    if (user.length < 4 || user.length > 10) {
      return res.status(400).json({
        success: false,
        message: "El usuario debe tener entre 4 y 10 caracteres",
      });
    }

    // Verifica si el nombre de usuario ya existe
    const verificaUsuario = await modeloUsuario.findOne({ user });
    if (verificaUsuario) {
      return res.status(409).json({
        success: false,
        message: "Ya existe ese usuario. Cambia el nombre por favor.",
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = new modeloUsuario({
      user,
      pass: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Respuesta de éxito
    return res.status(201).json({
      success: true,
      message: "Se agregó un usuario",
    });
  } catch (error) {
    console.error("Error en el registro: ", error);
    return res.status(500).json({
      success: false,
      message: "Error en servidor",
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

    // Comparar la contraseña proporcionada con la almacenada
    const passwordMatch = await bcrypt.compare(req.body.pass, user.pass);
    if (!passwordMatch) {
      return res.status(404).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    // Respuesta de éxito con los datos del usuario
    return res.status(200).json({
      id: user.id,
      success: true,
      message: "Ingresando...",
      user: user.user,
    });
  } catch (error) {
    console.error("Error en el login: ", error);
    return res.status(500).json({
      success: false,
      message: "Error en servidor",
      error,
    });
  }
};
