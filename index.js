//index
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productosRoutes from "./routes/productos.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      max-width: 800px; 
      margin: 20px auto; 
      padding: 20px; 
      background: #fafafa;
    }
    .auth-section { 
      background: #f0f0f0; 
      padding: 15px; 
      border-radius: 5px; 
      margin-bottom: 20px; 
    }
    .hidden { display: none; }
    form { 
      margin: 15px 0; 
      padding: 15px; 
      background: white; 
      border-radius: 5px; 
    }
    input { 
      margin: 5px 0; 
      padding: 8px; 
      width: 100%; 
      box-sizing: border-box; 
    }
    button { 
      padding: 10px 20px; 
      margin: 5px; 
      cursor: pointer; 
      background: #007bff; 
      color: white; 
      border: none; 
      border-radius: 3px; 
    }
    button:hover { background: #0056b3; }
    .logout-btn { background: #dc3545; }
    .logout-btn:hover { background: #c82333; }
    #userInfo { color: green; font-weight: bold; }
  </style>
</head>
<body>
  <div class="auth-section">
    <div id="loginSection">
      <h2>🔐 Iniciar Sesión</h2>
      <form onsubmit="event.preventDefault(); login();">
        <input id="loginUsername" type="text" placeholder="Usuario" required />
        <input id="loginPassword" type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <p><small>Usuario: admin | Contraseña: admin123</small></p>
    </div>
    <div id="loggedSection" class="hidden">
      <p id="userInfo"></p>
      <button class="logout-btn" onclick="logout()">Cerrar Sesión</button>
    </div>
  </div>

  <div id="productosSection" class="hidden">
    <h1>Buscar producto por ID</h1>
    <form onsubmit="event.preventDefault(); redirigir();">
      <label for="prodId">ID del producto:</label>
      <input id="prodId" type="text" placeholder="Escribí el ID" required />
      <button type="submit">Ver producto</button>
    </form>

    <h1>Crear Producto</h1>
    <form onsubmit="event.preventDefault(); crearProducto();">
      <input id="nombre" placeholder="Nombre" required />
      <input id="precio" type="number" placeholder="Precio" required />
      <input id="descripcion" placeholder="Descripción" />
      <button type="submit">Crear</button>
    </form>

    <h1>Eliminar producto por ID</h1>
    <form onsubmit="event.preventDefault(); borrarProducto()">
      <label for="borrarId">ID del producto:</label>
      <input id="borrarId" type="text" placeholder="Escribí el ID" required />
      <button type="submit">Eliminar producto</button>
    </form>
  </div>

  <script>
    window.onload = function() {
      const token = localStorage.getItem('token');
      if (token) {
        showLoggedIn();
      }
    };

    async function login() {
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      try {
        const res = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        
        if (res.ok && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', username);
          alert('Inicio de sesión exitoso');
          showLoggedIn();
        } else {
          alert(data.error || 'Error al iniciar sesión');
        }
      } catch (err) {
        console.error(err);
        alert('Error de conexión');
      }
    }

    function showLoggedIn() {
      const username = localStorage.getItem('username');
      document.getElementById('loginSection').classList.add('hidden');
      document.getElementById('loggedSection').classList.remove('hidden');
      document.getElementById('productosSection').classList.remove('hidden');
      document.getElementById('userInfo').textContent = 'Usuario: ' + username;
    }

    function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      document.getElementById('loginSection').classList.remove('hidden');
      document.getElementById('loggedSection').classList.add('hidden');
      document.getElementById('productosSection').classList.add('hidden');
      alert('Sesión cerrada');
    }

    function getAuthHeaders() {
      const token = localStorage.getItem('token');
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
    }

    function redirigir() {
      const id = document.getElementById('prodId').value.trim();
      if (id) {
        window.location.href = '/api/productos/' + id;
      }
    }

    async function borrarProducto() {
      const id = document.getElementById('borrarId').value.trim();
      if (!id) return;

      try {
        const res = await fetch('/api/productos/' + id, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        const data = await res.json();
        
        if (res.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          logout();
        } else {
          alert(data.message || data.error);
        }
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
        const res = await fetch('/api/productos/create', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ nombre, precio, descripcion })
        });

        const data = await res.json();
        
        if (res.status === 401) {
          alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
          logout();
        } else {
          alert(data.message || data.error);
          if (res.ok) {
            document.getElementById('nombre').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('descripcion').value = '';
          }
        }
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

app.use("/auth", authRoutes);
app.use("/api/productos", productosRoutes);

app.use((_, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () =>
  console.log(`servidor corriendo en http://localhost:${PORT}`)
);
