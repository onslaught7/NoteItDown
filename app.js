import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

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

async function fetchBookImage(bookId, bookTitle) {
    try {
        const response = await axios.get(
            `https://openlibrary.org/search.json?title=${encodeURIComponent(bookTitle)}`
        );

        if (response.data.docs && response.data.docs.length > 0) {
            const coverId = response.data.docs[0].cover_i;
            let imageUrl = '';

            if (coverId) {
                imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`; // Using 'L' for large cover size
            }

            // Update the database with the fetched image URL
            await db.query("UPDATE books_list SET imageurl = $1 WHERE id = $2", [imageUrl, bookId]);
        } 
    } catch (err) {
        console.error(`Failed to fetch image for book '${bookTitle}':`, error);
    }
}
app.get("/", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT books_list.id, books_list.title, imageurl, rating, notes FROM books_list JOIN book_notes ON books_list.id = book_notes.book_id ORDER BY books_list.id ASC;"
        ); 
    
        books = result.rows;

        for(let book of books) {
            if (!book.imageurl) {
                await fetchBookImage(book.id, book.title);
            }
        }

        const updatedResult = await db.query(
            "SELECT books_list.id, books_list.title, imageurl, rating, notes FROM books_list JOIN book_notes ON books_list.id = book_notes.book_id ORDER BY books_list.id ASC;"
        );

        books = updatedResult.rows;

        res.render("index.ejs", {
            books: books,
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/book", async (req, res) => {
    try {
        const bookId = req.body.id;
        const result = await db.query(
            "SELECT books_list.title, imageurl, rating, summary, notes FROM books_list JOIN book_notes ON books_list.id = book_notes.book_id WHERE books_list.id = $1 ORDER BY books_list.id ASC;",
            [bookId]
        );

        let book = result.rows[0];

        if(!book.imageurl) {
            await fetchBookImage(bookId, book.title);

            const updatedResult = await db.query(
                "SELECT books_list.title, imageurl, rating, summary, notes FROM books_list JOIN book_notes ON books_list.id = book_notes.book_id WHERE books_list.id = $1 ORDER BY books_list.id ASC;"
            );
            // always specify the index position since it returns an array of Object
            // therefore we have to specify the index of the array to be sent over
            // In this case we send the first object containing the details from our query stored in result in our array
            // This will always be 0 since only one object will be returned from each run of the query, one book is a unique id and corresponds to only one record
            book = updatedResult.rows[0];
        }

        res.render("book.ejs", {
            book: book
        });        
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});