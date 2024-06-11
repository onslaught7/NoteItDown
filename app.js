import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const books = [
    {
        id: 1,
        title: 'Book One',
        imageUrl: '/images/book1.jpg',
        rating: 8,
        finishDate: '2023-12-01',
        summary: 'This is a summary of book one.',
        notes: ['Note 1 for book one', 'Note 2 for book one']
    },
    {
        id: 2,
        title: 'Book Two',
        imageUrl: '/images/book2.jpg',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book two.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    }
    // Add more books as needed
];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        books: books,
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});