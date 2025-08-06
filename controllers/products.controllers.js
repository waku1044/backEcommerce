import modeloProducto from "../models/products.modules.js";

export const agregarProducto = async (req, res) => {
  const { img, nombre, precio, descripcion, categoria } = req.body;

  if (!img || !nombre || !precio || !descripcion || !categoria) {
    console.log("No se agrego el producto");
    return res.status(409).json({ menssage: "Falta rellenar datos" });
  }

  try {
    const nuevoProducto = new modeloProducto(req.body);
    const response = await nuevoProducto.save();
    console.log("Se agrego el producto");
    return res
      .status(201)
      .json({ message: "Se agrego el producto", payload: response });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const mostrarProductos = async (req, res) => {
  try {
    const productos = await modeloProducto.find();
    if (!productos) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
    return res.status(200).json({ message: "Productos", payload: productos });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const productoPorId = async (req, res) => {
  const { id } = req.params;

  // Verificar si el ID tiene el formato correcto (esto depende del formato de tus ID's)
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "ID inválido" }); // Responde con un error 400 si el ID no es válido
  }
  try {
    const producto = await modeloProducto.findById(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res
      .status(200)
      .json({ message: "Producto encontrado", payload: producto });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { img, nombre, precio, descripcion, categoria } = req.body;

  if(!img || !nombre || !precio || !descripcion || !categoria ){
    return res.status(400).json({message:'Debe rellenar los campos'})
  }

  try {
    const productoActualizar = await modeloProducto.findByIdAndUpdate(id, {
      img,
      nombre,
      precio,
      descripcion,
      categoria,
    },{ new: true });
    if (!productoActualizar) {
      return res.status(404).json({ message: "No existe el producto." });
    }
    return res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const productoEliminado = await modeloProducto.findByIdAndDelete(id);
    if(!eliminarProducto){
      return res.status(404).json({message:'No se encuentra el producto'})
    };
    return res.status(200).json({message: 'Se elimino el producto'})
    
  } catch (error) {
    res.status(500).json("Error en el servidor");  
  }
    
    
    
}
