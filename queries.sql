SELECT books_list.id, books_list.title, imageurl, rating, notes 
FROM books_list
JOIN book_notes
ON books_list.id = book_notes.book_id
ORDER BY books_list.id ASC;

-- Update for id = 1
UPDATE book_notes
SET notes = ARRAY['Importance of a Detox', 'Cans and can''ts of a detox.', 'Reset your brain to make hard things more interesting']
WHERE id = 1;

-- Update for id = 2
UPDATE book_notes
SET notes = ARRAY['Taking action is the most crucial step to reach nearer to goals', 'You learn the most by doing it', 'Change your ratio of input to output as 1:2']
WHERE id = 2;

-- Update for id = 3
UPDATE book_notes
SET notes = ARRAY['Commit yourself to the task at the same time every day to build habit', 'Lack of direction is the biggest reason for lack of focus', 'Procrastination is a habit of killing which gives birth to focus']
WHERE id = 3;

-- Update for id = 4
UPDATE book_notes
SET notes = ARRAY['Always think and strategize your plan of action before doing anything', 'Hard workers are just lazy thinkers', 'You have to work hard smartly']
WHERE id = 4;
