-- Quering relevant columns and data from pgadmin and sending it to .ejs files
SELECT books_list.id, books_list.title, imageurl, rating, notes 
FROM books_list
JOIN book_notes
ON books_list.id = book_notes.book_id
ORDER BY books_list.id ASC;

-- Creating book_notes table 
CREATE TABLE book_notes (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	notes TEXT[],
	book_id INTEGER REFERENCES books_list(id),
	summary TEXT
);

-- Insert the values to book_notes table
INSERT INTO book_notes (title, notes, book_id, summary)
VALUES 
    ('Dopamine Detox', ARRAY['Importance of a Detox', 'Cans and can''ts of a detox.', 'Reset your brain to make hard things more interesting'], 1, 'A book that sets you on track'),
	('Immediate Action', ARRAY['Taking action is the most crucial step to reach nearer to goals', 'You learn the most by doing it', 'Change your ratio of input to output as 1:2'], 2, 'A book that teaches you learn the most when you act'),
	('Powferful Focus', ARRAY['Commit yourself to the task at the same time every day to build habit', 'Lack of direction is the biggest reason for lack of focus', 'Procrastination is a habit of killing which gives birth to focus'], 3, 'Strong focus for a long time is what distinguishes the succesful ones from the ones that are not'),
	('Strategic Mindset', ARRAY['Always think and strategize your plan of action before doing anything', 'Hard workers are just lazy thinkers', 'You have to work hard smartly'], 4, 'How to do a few things with maximum effect rather than a lot of things with side effects.');


-- Render based on the book id fetched from post request
SELECT books_list.title, imageurl, rating, summary, notes 
FROM books_list 
JOIN book_notes 
ON books_list.id = book_notes.book_id 
WHERE books_list.id = 1
ORDER BY books_list.id ASC;

-- Update the database with the fetched image URL
("UPDATE books_list SET imageurl = $1 WHERE id = $2", [imageUrl, bookId]);

-- Sorting by ratings and then alphabetically if ratings are similar
SELECT books_list.id, books_list.title, imageurl, rating, notes 
FROM books_list 
JOIN book_notes ON books_list.id = book_notes.book_id
ORDER BY rating DESC, books_list.title ASC; 
