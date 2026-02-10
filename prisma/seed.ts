import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const coverFor = async(isbn?: string, title?: string) => {
  if (isbn && isbn.trim().length > 0) {
    // OpenLibrary cover by ISBN
    const url = `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-M.jpg?default=false`;
      const res = await fetch(url);
      console.log('OpenLibrary fetch status for isbn ' + isbn + ' : ' + res.status)
      if (!res.ok) {
        console.log('OpenLibrary fetch error for isbn ' + isbn)
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(title || "Book")}&size=512`;

      } 
    return url;
  }
  // fallback avatar generated from title
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(title || "Book")}&size=512`;
};

const createBook = async (b: { title: string; author: string; isbn?: string; categoryId: number }) =>{
 console.log('create book', b)
  return prisma.book.create({
    data: {
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      categoryId: b.categoryId,
      image: await coverFor(b.isbn, b.title), // requires `coverImage` field on Book model
    }
    
  });
}


const load = async () => {
  try {
   
    await prisma.category.deleteMany()

    // CREATEMANY nto supported for sqlite!!
    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'BD'
      } 
    })
    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Roman'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Science-fiction'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Cuisine'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Maison'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Développement personnel'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Essai'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Entreprise et bourse'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Informatique et nouvelles technologies'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Sciences'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Loisirs et sports'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Livres pour enfants'
      } 
    })

    await prisma.category.create({
      data:{
        createdAt: new Date(),
        name: 'Santé'
      } 
    })
// const books = [
// {title: 'Madame Bovary',author: 'Gustave Flaubert',isbn:'9782070413119',categoryId:2} ,
// {title: 'Le Rouge et le Noir',author: 'Stendhal',isbn:'9782070360178',categoryId:2} ,
// {title: 'Les Misérables',author: 'Victor Hugo',isbn:'9782070409228',categoryId:2} ,
// {title: 'L\'Étranger',author: 'Albert Camus',isbn:'9782070360024',categoryId:2} ,
// {title: 'Germinal',author: 'Émile Zola',isbn:'9782070411429',categoryId:2} ,
// {title: 'Le Père Goriot',author: 'Honoré de Balzac',isbn:'9782070409341',categoryId:2} ,
// {title: 'Le Grand Meaulnes',author: 'Alain-Fournier',isbn:'9780140182828',categoryId:2} ,
// {title: 'Bel-Ami',author: 'Guy de Maupassant',isbn:'9782072885068',categoryId:2} ,
// {title: 'La Princesse de Clèves',author: 'Madame de La Fayette',isbn:'9782070414437',categoryId:2} ,
// {title: 'Thérèse Raquin',author: 'Émile Zola',isbn:'9782070418008',categoryId:2} ,
// {title: 'Voyage au bout de la nuit',author: 'Louis-Ferdinand Céline',isbn:'9782070213047',categoryId:2} ,
// {title: 'La Chartreuse de Parme',author: 'Stendhal',isbn:'9782266082693',categoryId:2} ,
// {title: 'Le Comte de Monte-Cristo',author: 'Alexandre Dumas',isbn:'9782070405923',categoryId:2} ,
// {title: 'La Condition humaine',author: 'André Malraux',isbn:'9782070360017',categoryId:2} ,
// {title: 'Bonjour tristesse',author: 'Françoise Sagan',isbn:'9780141198750',categoryId:2} ,
// {title: 'Les Trois Mousquetaires',author: 'Alexandre Dumas',isbn:'9782070417681',categoryId:2} ,
// {title: 'Notre-Dame de Paris',author: 'Victor Hugo',isbn:'9782070345830',categoryId:2} ,
// {title: 'Manon Lescaut',author: 'Abbé Prévost',isbn:'9780199554928',categoryId:2} ,
// {title: 'Du côté de chez Swann',author: 'Marcel Proust',isbn:'9782070368211',categoryId:2} ,
// {title: 'À la recherche du temps perdu (intégrale)',author: 'Marcel Proust',isbn:'9782070379248',categoryId:2} ,
// {title: 'La Peste',author: 'Albert Camus',isbn:'9782070360420',categoryId:2} ,
// {title: 'La Symphonie Pastorale',author: 'André Gide',isbn:'9782070360338',categoryId:2} ,
// {title: 'La Nausée',author: 'Jean-Paul Sartre',isbn:'9782070360021',categoryId:2} ,
// {title: 'Les Faux-monnayeurs',author: 'André Gide',isbn:'9782070360214',categoryId:2} ,
// {title: 'Les Enfants Terribles',author: 'Jean Cocteau',isbn:'9782070410569',categoryId:2} ,
// {title: 'Nana',author: 'Émile Zola',isbn:'9782070411436',categoryId:2} ,
// {title: 'Pot-Bouille',author: 'Émile Zola',isbn:'9782070411467',categoryId:2} ,
// {title: 'Le Feu',author: 'Henri Barbusse',isbn:'9782070413515',categoryId:2} ,
// {title: 'Le Lys dans la Vallée',author: 'Honoré de Balzac',isbn:'9782070410460',categoryId:2} ,
// {title: 'La Vie devant soi',author: 'Romain Gary (Émile Ajar)',isbn:'9782070369270',categoryId:2} ,
// {title: 'Les Choses',author: 'Georges Perec',isbn:'9782070362103',categoryId:2} ,
// {title: 'Le Hussard sur le toit',author: 'Jean Giono',isbn:'9782070361939',categoryId:2} ,
// {title: 'Un roi sans divertissement',author: 'Jean Giono',isbn:'9782070361960',categoryId:2} ,
// {title: 'Chéri',author: 'Colette',isbn:'9782070362301',categoryId:2} ,
// {title: 'Gigi',author: 'Colette',isbn:'9782070362325',categoryId:2} ,
// {title: 'Le Diable au corps',author: 'Raymond Radiguet',isbn:'9782070362268',categoryId:2} ,
// {title: 'Les Liaisons dangereuses',author: 'Choderlos de Laclos',isbn:'9782070362251',categoryId:2} ,
// {title: 'Le Grand Coeur',author: 'Jean Giono',isbn:'9782070361984',categoryId:2} ,
// {title: 'Les Grands Cimetières sous la lune',author: 'Louis-Ferdinand Céline',isbn:'9782070362058',categoryId:2} ,
// {title: 'Au bonheur des dames',author: 'Émile Zola',isbn:'9782070411498',categoryId:2} ,
// {title: 'Les Rougon-Macquart (sélection)',author: 'Émile Zola',isbn:'9782070411405',categoryId:2} ,
// ]

//     await Promise.all(books.map(createBook));

// await prisma.$executeRawUnsafe(`Insert into Book(title, author, isbn) VALUES('Le Petit Prince','Antoine de Saint‑Exupéry','9782070612758');`)






  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()