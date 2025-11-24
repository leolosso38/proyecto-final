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
app.get("/", (_, res) => {
  res.send(`
    <html>
      <body>
        <h1>Buscar producto por ID</h1>
        <form action="/productos" method="get" onsubmit="event.preventDefault(); redirigir();">
          <label for="prodId">ID del producto:</label>
          <input id="prodId" type="text" placeholder="Escribí el ID" required />
          <button type="submit">Ver producto</button>
        </form>
         <h1>Crear Producto</h1>
        <form onsubmit="event.preventDefault(); crearProducto();">
        <input id="nombre" placeholder="Nombre" required>
        <input id="precio" type="number" placeholder="Precio" required>
        <input id="descripcion" placeholder="Descripción">
        <button type="submit">Crear</button>


          </form>
          <h1>Eliminar producto por ID</h1>
          <form onsubmit="event.preventDefault(); borrarProducto()">
          <label for="borrarId">ID del producto:</label>
          <input id="borrarId" type="text" placeholder="Escribí el ID" required />
          <button type="submit">Eliminar producto</button>
          </form>


        <script>
          function redirigir() {
            const id = document.getElementById('prodId').value.trim();
            if (id) {
              window.location.href = '/productos/' + id;
            }
          }

          async function borrarProducto() {
          const id = document.getElementById('borrarId').value.trim();
          if (!id) return;

        try {
          const res = await fetch('/productos/delete/' + id, {
            method: 'DELETE'
          });

          const data = await res.json();
          alert(data.message || data.error);
        } catch (err) {
          console.error(err);
          alert('Error al borrar el producto');
        }
      }

      async function crearProducto() {
      const nombre = document.getElementById('nombre').value;
      const precio = document.getElementById('precio').value;
      const descripcion = document.getElementById('descripcion').value;

      try {
       const res = await fetch('/productos/create', {
       method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ nombre, precio, descripcion })
      });

       const data = await res.json();
       alert(data.message || data.error);
        } catch(err) {
        console.error(err);
       alert('Error al crear el producto');
    }
}
        </script>
      </body>
    </html>
  `);
});
app.use("/productos", productosRoutes);

app.use((_, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
app.listen(PORT, () =>
  console.log(`servidor corriendo en http://localhost:${PORT}`)
);
