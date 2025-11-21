import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  getAllProducts,
  saveProduct,
  deleteProductById,
} from "./products.model.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/productos", async (_, res) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productoss" });
  }
});

app.post("/productos/create", async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    await saveProduct({ nombre, precio, descripcion });
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

app.post("/productos/delete", async (req, res) => {
  try {
    await deleteProductById(req.body.id);
    res.status(200).json({ message: "borrado existosamente" });
  } catch (error) {
    console.error("❌ Error al borrar:", error.message);
    res.status(500).json({ error: "Error al borrar producto" });
  }
});

app.listen(PORT, () =>
  console.log(`servidor corriendo en http://localhost:${PORT}`)
);
