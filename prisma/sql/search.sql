-- @param {String} $1:term
SELECT * FROM "Book" WHERE to_tsvector('french', "title") @@ to_tsquery('french', $1);
