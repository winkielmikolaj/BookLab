const { initDB } = require('./database/db');
initDB(); // db initialization

const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");

// Middleware do parsowania JSON
app.use(express.json());

// Dodaj tę linijkę ▼▼▼ (obsługa plików statycznych)
app.use(express.static('public')); // serwuj pliki z folderu "public"

// Routing API
app.use("/api", bookRoutes);

// Przykład obsługi błędu
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Coś poszło nie tak!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});