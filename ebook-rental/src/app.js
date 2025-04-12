const { initDB } = require('./database/db');
initDB(); //db initialization

const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");



// middleware do parsowania JSON
app.use(express.json());

app.use("/api", bookRoutes);

// przykład obsługi błędu
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Coś poszło nie tak!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});