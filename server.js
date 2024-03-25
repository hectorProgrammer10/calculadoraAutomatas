const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;

// Define el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(path.join(__dirname, "src", "js")));

// Ruta para servir el archivo HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
