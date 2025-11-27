//obtenerProductos.routes
import { Router } from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  borrarProducto,
} from "../controllers/products.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", obtenerProductos); // /productos
router.get("/:id", obtenerProductoPorId); // /productos/:id
router.post("/create", verifyToken, crearProducto); // /productos/create
router.delete("/:id", verifyToken, borrarProducto); // /productos/delete

export default router;
