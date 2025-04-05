const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../../data.json");

const saveData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

exports.getAllBooks = (req, res) => {
  try {
    const rawData = fs.readFileSync(dataPath);
    const books = JSON.parse(rawData);
    res.json(books);
  } catch (error) {
    console.error("Szczegóły błędu:", error.message); // Dodaj tę linię!
    res.status(500).json({ error: "Błąd odczytu danych" });
  }
};

exports.addBook = (req, res) => {
  try {
    const rawData = fs.readFileSync(dataPath);
    const books = JSON.parse(rawData);
    
    const newBook = req.body;
    books.push(newBook);
    
    saveData(books);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Błąd dodawania książki" });
  }
};
  
  exports.deleteBook = (req, res) => {
    try {
      const rawData = fs.readFileSync(dataPath);
      let books = JSON.parse(rawData);
      
      const bookId = parseInt(req.params.id);
      const initialLength = books.length;
      
      books = books.filter(book => book.id !== bookId);
      
      if (books.length === initialLength) {
        return res.status(404).json({ error: "Książka nie znaleziona" });
      }
      
      saveData(books);
      res.json({ message: "Książka usunięta pomyślnie" });
    } catch (error) {
      res.status(500).json({ error: "Błąd usuwania książki" });
    }
  };
  
  exports.updateBook = (req, res) => {
    try {
      const rawData = fs.readFileSync(dataPath);
      let books = JSON.parse(rawData);
      
      const bookId = parseInt(req.params.id);
      const bookIndex = books.findIndex(book => book.id === bookId);
      
      if (bookIndex === -1) {
        return res.status(404).json({ error: "Książka nie znaleziona" });
      }
      
      // Aktualizuj tylko przesłane pola
      books[bookIndex] = { 
        ...books[bookIndex], 
        ...req.body 
      };
      
      saveData(books);
      res.json(books[bookIndex]);
    } catch (error) {
      res.status(500).json({ error: "Błąd aktualizacji książki" });
    }
  };