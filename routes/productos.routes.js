//obtenerProductos.routes
import { Router } from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  borrarProducto,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", obtenerProductos); // /productos
router.get("/:id", obtenerProductoPorId); // /productos/:id
router.post("/create", crearProducto); // /productos/create
router.delete("/delete/:id", borrarProducto); // /productos/delete

export default router;
