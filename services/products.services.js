import {
  getAllProducts,
  getProductById,
  saveProduct,
  deleteProductById,
} from "../models/products.model.js";

export const validarProducto = (producto) => {
  const errores = [];
  if (!producto.nombre || producto.nombre.trim() === "") {
    errores.push("El nombre es requerido");
  }
  if (!producto.precio || producto.precio <= 0) {
    errores.push("El precio debe ser mayo a 0");
  }
  if (producto.descripcion && producto.descripcion.length > 500) {
    errores.push("La descripcion no puede superar los 500 caracteres");
  }
  return errores;
};

export async function obtenerTodosLosProductos(filtros = {}) {
  const productos = await getAllProducts();

  // Ejemplo: ordenar por precio
  if (filtros.ordenarPorPrecio) {
    productos.sort((a, b) => a.precio - b.precio);
  }

  // Ejemplo: filtrar por precio máximo
  if (filtros.precioMaximo) {
    return productos.filter((p) => p.precio <= filtros.precioMaximo);
  }

  return productos;
}

export async function obtenerProducto(id) {
  if (!id || id.trim() === "") {
    throw new Error("ID inválido");
  }

  const producto = await getProductById(id);

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  return producto;
}

export async function crearNuevoProducto(datosProducto) {
  // Validar datos
  const errores = validarProducto(datosProducto);
  if (errores.length > 0) {
    throw new Error(errores.join(", "));
  }
  return await saveProduct(datosProducto);
}

export async function eliminarProducto(id) {
  // Verificar que existe antes de eliminar
  const producto = await getProductById(id);

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  await deleteProductById(id);
  return { mensaje: "Producto eliminado exitosamente", producto };
}
