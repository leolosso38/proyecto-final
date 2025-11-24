//index
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import productosRoutes from "./routes/productos.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use("/productos", productosRoutes);

app.use((_, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
app.listen(PORT, () =>
  console.log(`servidor corriendo en http://localhost:${PORT}`)
);
