//products.controller.js
import {
  getAllProducts,
  saveProduct,
  deleteProductById,
  getProductById,
} from "../models/products.model.js";

//obtener todos los productos
export const obtenerProductos = async (_, res) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productoss" });
  }
};
//obtener productos por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const productos = await getProductById(req.params.id);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productoss" });
  }
};
//Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    await saveProduct({ nombre, precio, descripcion });
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};
//Borrar productos
export const borrarProducto = async (req, res) => {
  try {
    await deleteProductById(req.params.id);
    res.status(200).json({ message: "borrado existosamente" });
  } catch (error) {
    console.error("❌ Error al borrar:", error.message);
    res.status(500).json({ error: "Error al borrar producto" });
  }
};
