const express = require("express");
const app = express();
const port = 5000;

// Danh sách sách
const books = {
    1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
    6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "author": "Unknown", "title": "Njál's Saga", "reviews": {} },
    8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
    9: { "author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {} },
    10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

app.get("/isbn/:id", (req, res) => {
    const bookId = req.params.id.trim(); 
    if (books[bookId]) {
        res.json(books[bookId]);
    } else {
        res.status(404).json({ error: "Book not found" });
    }
});

app.get("/author/:name", (req, res) => {
    const authorName = req.params.name.trim().toLowerCase(); 
    const filteredBooks = Object.values(books).filter(book => 
        book.author.toLowerCase().trim() === authorName
    );

    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        res.status(404).json({ error: "No books found for this author" });
    }
});


app.get("/title/:name", (req, res) => {
    const bookTitle = req.params.name.trim().toLowerCase(); 
    const filteredBooks = Object.values(books).filter(book => 
        book.title.toLowerCase().trim() === bookTitle
    );

    if (filteredBooks.length > 0) {
        res.json(filteredBooks);
    } else {
        res.status(404).json({ error: "No books found with this title" });
    }
});

app.use(express.json());


app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    res.json({ message: "User successfully registered. Now you can login" });
});


app.post("/customer/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    res.json({ message: "User successfully logged in" });
});


const loggedInUser = { username: "user1" };


app.put("/customer/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;

    if (!review) {
        return res.status(400).json({ error: "Review content is required" });
    }

    if (!books[isbn]) {
        return res.status(404).json({ error: "Book not found" });
    }

    books[isbn].reviews[loggedInUser.username] = review;

    res.json({
        message: `The review of the book with ISBN ${isbn} is updated with "${review}" by ${loggedInUser.username}.`
    });
});

app.delete("/customer/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;

    if (!books[isbn]) {
        return res.status(404).json({ error: "Book not found" });
    }

    const loggedInUser = { username: "user1" };


    if (!books[isbn].reviews[loggedInUser.username]) {
        return res.status(404).json({ error: "Review not found for this user" });
    }

 
    delete books[isbn].reviews[loggedInUser.username];

    res.json({
        message: `The review of the book with ISBN ${isbn} is deleted by ${loggedInUser.username}.`
    });
});



app.get("/", (req, res) => {
    res.json(books);
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://127.0.0.1:${port}`);
});
