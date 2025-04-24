document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");

  // 1) pobranie wszystkich książek i wyrenderowanie
  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const books = await res.json();
      bookList.innerHTML = "";

      books.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} – ${book.author}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Usuń";
        deleteBtn.addEventListener("click", async () => {
          await fetch(`/api/books/${book.id}`, { method: "DELETE" });
          fetchBooks();
        });

        li.appendChild(deleteBtn);
        bookList.appendChild(li);
      });
    } catch (error) {
      console.error("Błąd podczas pobierania książek:", error);
    }
  };

  // 2) obsługa submita formularza dodawania
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();

    if (!title || !author) {
      alert("Proszę wpisać tytuł i autora.");
      return;
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      bookForm.reset();
      fetchBooks();
    } catch (error) {
      console.error("Błąd podczas dodawania książki:", error);
    }
  });

  // inicjalne załadowanie
  fetchBooks();
});
