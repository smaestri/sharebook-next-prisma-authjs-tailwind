SELECT * FROM "Book" WHERE to_tsvector('english', "Book"."title") @@ to_tsquery('french', ${term});
