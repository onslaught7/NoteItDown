import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "Kbsboss@023098",
    port: 5432
});

db.connect();

const books = [
    {
        id: 1,
        title: 'Book One',
        imageUrl: '/images/book1.png',
        rating: 8,
        finishDate: '2023-12-01',
        summary: 'This is a summary of book one.',
        notes: ['Note 1 for book one', 'Note 2 for book one']
    },
    {
        id: 2,
        title: 'Book Two',
        imageUrl: '/images/book2.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book two.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 3,
        title: 'Book Three',
        imageUrl: '/images/book3.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book three.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 4,
        title: 'Book Four',
        imageUrl: '/images/book4.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book four.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 5,
        title: 'Book Five',
        imageUrl: '/images/book1.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book five.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 6,
        title: 'Book Six',
        imageUrl: '/images/book2.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book six.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 7,
        title: 'Book Seven',
        imageUrl: '/images/book3.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book seven.',
        notes: ['Note 1 for book two', 'Note 2 for book two']
    },
    {
        id: 8,
        title: 'Book Eight',
        imageUrl: '/images/book4.png',
        rating: 9,
        finishDate: '2024-01-01',
        summary: 'This is a summary of book eight.',
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