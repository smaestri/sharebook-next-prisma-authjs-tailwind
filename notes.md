erreur avec onclick et call sur SA
==> utiliser <button formaction={sa}> au lie de <button oncmlick="...">

ne pas oublier `npx prisma migrate dev` si changement de schema, pour que studio ok

pour full text search ne pas oublier flag --sql
`npx prisma generate --sql`

