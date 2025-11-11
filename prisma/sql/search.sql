-- @param {String} $1:term
SELECT * FROM "Book" WHERE to_tsvector('english', "title") @@ to_tsquery('english', $1);
