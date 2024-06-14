SELECT books_list.id, books_list.title, imageurl, rating, notes 
FROM books_list
JOIN book_notes
ON books_list.id = book_notes.book_id
ORDER BY books_list.id ASC;

