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

let books = [];

// const books = [
//     {
//         id: 1,
//         title: 'Book One',
//         imageUrl: '/images/book1.png',
//         rating: 8,
//         notes: ['Note 1 for book one', 'Note 2 for book one']
//     },
//     {
//         id: 2,
//         title: 'Book Two',
//         imageUrl: '/images/book2.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 3,
//         title: 'Book Three',
//         imageUrl: '/images/book3.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 4,
//         title: 'Book Four',
//         imageUrl: '/images/book4.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 5,
//         title: 'Book Five',
//         imageUrl: '/images/book1.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 6,
//         title: 'Book Six',
//         imageUrl: '/images/book2.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 7,
//         title: 'Book Seven',
//         imageUrl: '/images/book3.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     },
//     {
//         id: 8,
//         title: 'Book Eight',
//         imageUrl: '/images/book4.png',
//         rating: 9,
//         notes: ['Note 1 for book two', 'Note 2 for book two']
//     }
//     // Add more books as needed
// ];

app.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT books_list.id, books_list.title, imageurl, rating, notes FROM books_list JOIN book_notes ON books_list.id = book_notes.book_id ORDER BY books_list.id ASC;"
        ); 
    
        books = result.rows;

        // console.log(books[0].id);
        // console.log(books[1].title);
        // console.log(books[2].imageurl);
        // console.log(books[3].rating);

        res.render("index.ejs", {
            books: books,
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/book", async (req, res) => {
    try{
        const bookId = req.body.id;
        console.log(bookId);
    } catch (err){
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});