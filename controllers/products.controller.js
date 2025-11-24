//products.controller.js

import {
  crearNuevoProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerTodosLosProductos,
} from "../services/products.services.js";
//obtener todos los productos
export const obtenerProductos = async (_, res) => {
  try {
    const productos = await obtenerTodosLosProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productoss" });
  }
};
//obtener productos por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const productos = await obtenerProducto(req.params.id);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};
//Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    await crearNuevoProducto({ nombre, precio, descripcion });
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};
//Borrar productos
export const borrarProducto = async (req, res) => {
  try {
    await eliminarProducto(req.params.id);
    res.status(200).json({ message: "borrado existosamente" });
  } catch (error) {
    console.error("❌ Error al borrar:", error.message);
    res.status(500).json({ error: "Error al borrar producto" });
  }
};
