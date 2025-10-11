import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();


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
        name: 'Entreprise et bourse'
      } 
    })
    await prisma.book.create({data:{title: 'Madame Bovary',author: 'Gustave Flaubert',isbn:'9782070413119',categoryId:2} })
await prisma.book.create({data:{title: 'Le Rouge et le Noir',author: 'Stendhal',isbn:'9782070360178',categoryId:2} })
await prisma.book.create({data:{title: 'Les Misérables',author: 'Victor Hugo',isbn:'9782070409228',categoryId:2} })
await prisma.book.create({data:{title: 'L\'Étranger',author: 'Albert Camus',isbn:'9782070360024',categoryId:2} })
await prisma.book.create({data:{title: 'Germinal',author: 'Émile Zola',isbn:'9782070411429',categoryId:2} })
await prisma.book.create({data:{title: 'Le Père Goriot',author: 'Honoré de Balzac',isbn:'9782070409341',categoryId:2} })
await prisma.book.create({data:{title: 'Le Grand Meaulnes',author: 'Alain-Fournier',isbn:'9780140182828',categoryId:2} })
await prisma.book.create({data:{title: 'Bel-Ami',author: 'Guy de Maupassant',isbn:'9782072885068',categoryId:2} })
await prisma.book.create({data:{title: 'La Princesse de Clèves',author: 'Madame de La Fayette',isbn:'9782070414437',categoryId:2} })
await prisma.book.create({data:{title: 'Thérèse Raquin',author: 'Émile Zola',isbn:'9782070418008',categoryId:2} })
await prisma.book.create({data:{title: 'Voyage au bout de la nuit',author: 'Louis-Ferdinand Céline',isbn:'9782070213047',categoryId:2} })
await prisma.book.create({data:{title: 'La Chartreuse de Parme',author: 'Stendhal',isbn:'9782266082693',categoryId:2} })
await prisma.book.create({data:{title: 'Le Comte de Monte-Cristo',author: 'Alexandre Dumas',isbn:'9782070405923',categoryId:2} })
await prisma.book.create({data:{title: 'La Condition humaine',author: 'André Malraux',isbn:'9782070360017',categoryId:2} })
await prisma.book.create({data:{title: 'Bonjour tristesse',author: 'Françoise Sagan',isbn:'9780141198750',categoryId:2} })
await prisma.book.create({data:{title: 'Les Trois Mousquetaires',author: 'Alexandre Dumas',isbn:'9782070417681',categoryId:2} })
await prisma.book.create({data:{title: 'Notre-Dame de Paris',author: 'Victor Hugo',isbn:'9782070345830',categoryId:2} })
await prisma.book.create({data:{title: 'Manon Lescaut',author: 'Abbé Prévost',isbn:'9780199554928',categoryId:2} })
await prisma.book.create({data:{title: 'Du côté de chez Swann',author: 'Marcel Proust',isbn:'9782070368211',categoryId:2} })
await prisma.book.create({data:{title: 'À la recherche du temps perdu (intégrale)',author: 'Marcel Proust',isbn:'9782070379248',categoryId:2} })
await prisma.book.create({data:{title: 'La Peste',author: 'Albert Camus',isbn:'9782070360420',categoryId:2} })
await prisma.book.create({data:{title: 'La Symphonie Pastorale',author: 'André Gide',isbn:'9782070360338',categoryId:2} })
await prisma.book.create({data:{title: 'La Nausée',author: 'Jean-Paul Sartre',isbn:'9782070360021',categoryId:2} })
await prisma.book.create({data:{title: 'Les Faux-monnayeurs',author: 'André Gide',isbn:'9782070360214',categoryId:2} })
await prisma.book.create({data:{title: 'Les Enfants Terribles',author: 'Jean Cocteau',isbn:'9782070410569',categoryId:2} })
await prisma.book.create({data:{title: 'Nana',author: 'Émile Zola',isbn:'9782070411436',categoryId:2} })
await prisma.book.create({data:{title: 'Pot-Bouille',author: 'Émile Zola',isbn:'9782070411467',categoryId:2} })
await prisma.book.create({data:{title: 'Le Feu',author: 'Henri Barbusse',isbn:'9782070413515',categoryId:2} })
await prisma.book.create({data:{title: 'Le Lys dans la Vallée',author: 'Honoré de Balzac',isbn:'9782070410460',categoryId:2} })
await prisma.book.create({data:{title: 'La Vie devant soi',author: 'Romain Gary (Émile Ajar)',isbn:'9782070369270',categoryId:2} })
await prisma.book.create({data:{title: 'Les Choses',author: 'Georges Perec',isbn:'9782070362103',categoryId:2} })
await prisma.book.create({data:{title: 'Le Hussard sur le toit',author: 'Jean Giono',isbn:'9782070361939',categoryId:2} })
await prisma.book.create({data:{title: 'Un roi sans divertissement',author: 'Jean Giono',isbn:'9782070361960',categoryId:2} })
await prisma.book.create({data:{title: 'Chéri',author: 'Colette',isbn:'9782070362301',categoryId:2} })
await prisma.book.create({data:{title: 'Gigi',author: 'Colette',isbn:'9782070362325',categoryId:2} })
await prisma.book.create({data:{title: 'Le Diable au corps',author: 'Raymond Radiguet',isbn:'9782070362268',categoryId:2} })
await prisma.book.create({data:{title: 'Les Liaisons dangereuses',author: 'Choderlos de Laclos',isbn:'9782070362251',categoryId:2} })
await prisma.book.create({data:{title: 'Le Grand Coeur',author: 'Jean Giono',isbn:'9782070361984',categoryId:2} })
await prisma.book.create({data:{title: 'Les Grands Cimetières sous la lune',author: 'Louis-Ferdinand Céline',isbn:'9782070362058',categoryId:2} })
await prisma.book.create({data:{title: 'Au bonheur des dames',author: 'Émile Zola',isbn:'9782070411498',categoryId:2} })
await prisma.book.create({data:{title: 'Les Rougon-Macquart (sélection)',author: 'Émile Zola',isbn:'9782070411405',categoryId:2} })
await prisma.book.create({data:{title: 'Mort à crédit',author: 'Louis-Ferdinand Céline',isbn:'9782070362072',categoryId:2} })
await prisma.book.create({data:{title: 'Le Chercheur d\'or',author: 'J. Giono',isbn:'9782070362041',categoryId:2} })
await prisma.book.create({data:{title: 'Les Misérables (version abrégée)',author: 'Victor Hugo',isbn:'9782070419249',categoryId:2} })
await prisma.book.create({data:{title: 'La Vie mode d\'emploi',author: 'Georges Perec',isbn:'9782070362110',categoryId:2} })
await prisma.book.create({data:{title: 'Le Rivage des Syrtes',author: 'Julien Gracq',isbn:'9782070362158',categoryId:2} })
await prisma.book.create({data:{title: 'Le Château',author: 'Franz Kafka (français)',isbn:'9782070362196',categoryId:2} })
await prisma.book.create({data:{title: 'La Reine Margot',author: 'Alexandre Dumas',isbn:'9782070417704',categoryId:2} })
await prisma.book.create({data:{title: 'L\'Assommoir',author: 'Émile Zola',isbn:'9782070411412',categoryId:2} })
await prisma.book.create({data:{title: 'Les Âmes mortes',author: 'Nikolai Gogol (traduction française)',isbn:'9782070362240',categoryId:2} })
await prisma.book.create({data:{title: 'La Jalousie',author: 'Alain Robbe-Grillet',isbn:'9782070362269',categoryId:2} })
await prisma.book.create({data:{title: 'Le Deuxième Sexe (fictionnel influence)',author: 'Simone de Beauvoir',isbn:'9782070362276',categoryId:2} })
await prisma.book.create({data:{title: 'Bonjour (nouvelle sélection)',author: 'Marguerite Duras',isbn:'9782070362283',categoryId:2} })
await prisma.book.create({data:{title: 'Histoire d\'O',author: 'Pauline Réage',isbn:'9782070362290',categoryId:2} })
await prisma.book.create({data:{title: 'Moderato Cantabile',author: 'Marguerite Duras',isbn:'9782070362306',categoryId:2} })
await prisma.book.create({data:{title: 'Elle s\'appelait Sarah',author: 'Tatiana de Rosnay',isbn:'9782253171355',categoryId:2} })
await prisma.book.create({data:{title: 'Le Petit Prince',author: 'Antoine de Saint-Exupéry',isbn:'9782070612758',categoryId:2} })
await prisma.book.create({data:{title: 'Les Mandarins',author: 'Simone de Beauvoir',isbn:'9782070362313',categoryId:2} })
await prisma.book.create({data:{title: 'Le Deuxième Sexe',author: 'Simone de Beauvoir',isbn:'9782070362320',categoryId:2} })
await prisma.book.create({data:{title: 'La Joueuse de go',author: 'Shin\'ichi Hoshi (traduction)',isbn:'9782070362337',categoryId:2} })
await prisma.book.create({data:{title: 'Le Parfum',author: 'Patrick Süskind (traduction FR)',isbn:'9782253131443',categoryId:2} })
await prisma.book.create({data:{title: 'En attendant Godot',author: 'Samuel Beckett (pièce)',isbn:'9782070362344',categoryId:2} })
await prisma.book.create({data:{title: 'Le Zèbre',author: 'Alexandre Jardin',isbn:'9782070362351',categoryId:2} })
await prisma.book.create({data:{title: 'Le Chapeau de Mitterrand',author: 'Antoine Laurain',isbn:'9782253089875',categoryId:2} })
await prisma.book.create({data:{title: 'Je m\'en vais',author: 'Jean Echenoz',isbn:'9782070362368',categoryId:2} })
await prisma.book.create({data:{title: 'Ravel',author: 'Jean Echenoz',isbn:'9782070362375',categoryId:2} })
await prisma.book.create({data:{title: 'Les Bienveillantes',author: 'Jonathan Littell (écrit en français)',isbn:'9782070362382',categoryId:2} })
await prisma.book.create({data:{title: 'Corpus Christi',author: 'Romain Gary',isbn:'9782070362399',categoryId:2} })
await prisma.book.create({data:{title: 'HHhH',author: 'Laurent Binet',isbn:'9782070785243',categoryId:2} })
await prisma.book.create({data:{title: 'La Carte et le Territoire',author: 'Michel Houellebecq',isbn:'9782072248198',categoryId:2} })
await prisma.book.create({data:{title: 'La Possibilité d\'une île',author: 'Michel Houellebecq',isbn:'9782070430018',categoryId:2} })
await prisma.book.create({data:{title: 'Soumission',author: 'Michel Houellebecq',isbn:'9782070464916',categoryId:2} })
await prisma.book.create({data:{title: 'Les Choses de la vie',author: 'Paul Guimard',isbn:'9782070362405',categoryId:2} })
await prisma.book.create({data:{title: 'Le Livre de ma mère',author: 'Albert Cohen',isbn:'9782070362412',categoryId:2} })
await prisma.book.create({data:{title: 'La Vie de Marianne',author: 'Marivaux',isbn:'9782070362429',categoryId:2} })
await prisma.book.create({data:{title: 'La Promesse de l\'aube',author: 'Romain Gary',isbn:'9782070362436',categoryId:2} })
await prisma.book.create({data:{title: 'L\'Immoraliste',author: 'André Gide',isbn:'9782070362443',categoryId:2} })
await prisma.book.create({data:{title: 'Les Nourritures terrestres',author: 'André Gide',isbn:'9782070362450',categoryId:2} })
await prisma.book.create({data:{title: 'Les Rivières pourpres',author: 'Jean-Christophe Grangé',isbn:'9782253150715',categoryId:2} })
await prisma.book.create({data:{title: 'Le Hussard Bleu (recueil)',author: 'Jean Giono',isbn:'9782070362467',categoryId:2} })
await prisma.book.create({data:{title: 'La Gloire de mon père',author: 'Marcel Pagnol',isbn:'9782070362474',categoryId:2} })
await prisma.book.create({data:{title: 'Le Château de ma mère',author: 'Marcel Pagnol',isbn:'9782070362481',categoryId:2} })
await prisma.book.create({data:{title: 'Jean-Christophe',author: 'Romain Rolland',isbn:'9782070362498',categoryId:2} })
await prisma.book.create({data:{title: 'La Guerre et la Paix (traduction)',author: 'L. Tolstoï (FR)',isbn:'9782070362504',categoryId:2} })
await prisma.book.create({data:{title: 'La Collégiale (roman contemporain)',author: 'X — Auteur contemporain',isbn:'9782070362511',categoryId:2} })
await prisma.book.create({data:{title: 'Les Fleurs du mal (prose)',author: 'Charles Baudelaire',isbn:'9782070362528',categoryId:2} })
await prisma.book.create({data:{title: 'Le Grand Meaulnes (édition poche)',author: 'Alain-Fournier',isbn:'9782070362535',categoryId:2} })
await prisma.book.create({data:{title: 'Le Sang des autres',author: 'Simone de Beauvoir',isbn:'9782070362542',categoryId:2} })
await prisma.book.create({data:{title: 'Les Mots',author: 'Jean-Paul Sartre',isbn:'9782070362559',categoryId:2} })
await prisma.book.create({data:{title: 'Le Libertinage',author: 'Auteur classique',isbn:'9782070362566',categoryId:2} })
await prisma.book.create({data:{title: 'Les Beaux Draps',author: 'Auteur contemporain',isbn:'9782070362573',categoryId:2} })
await prisma.book.create({data:{title: 'La Vieille Fille',author: 'Honoré de Balzac',isbn:'9782070362580',categoryId:2} })
await prisma.book.create({data:{title: 'Le Bal',author: 'Irène Némirovsky',isbn:'9782070362597',categoryId:2} })
await prisma.book.create({data:{title: 'Suite française',author: 'Irène Némirovsky',isbn:'9782070362603',categoryId:2} })
await prisma.book.create({data:{title: 'La Traversée de Paris',author: 'Marcel Aymé',isbn:'9782070362610',categoryId:2} })
await prisma.book.create({data:{title: 'Les Chants de Maldoror (roman/poème)',author: 'Comte de Lautréamont',isbn:'9782070362627',categoryId:2} })
await prisma.book.create({data:{title: 'Le Joueur d\'échecs',author: 'Stefan Zweig (FR)',isbn:'9782070362634',categoryId:2} })
await prisma.book.create({data:{title: 'Voyage avec un âne dans les Cévennes',author: 'Robert Louis Stevenson (traduction)',isbn:'9782070362641',categoryId:2} })
await prisma.book.create({data:{title: 'Un amour de Swann',author: 'Marcel Proust',isbn:'9782070362658',categoryId:2} })
await prisma.book.create({data:{title: 'Les Vagues',author: 'Virginia Woolf (traduction FR)',isbn:'9782070362665',categoryId:2} })
await prisma.book.create({data:{title: 'Le Rivage',author: 'Auteur divers',isbn:'9782070362672',categoryId:2} })
await prisma.book.create({data:{title: 'Madame Bovary',author: 'Gustave Flaubert',isbn:'9782070413119',categoryId:2} })
await prisma.book.create({data:{title: 'Le Rouge et le Noir',author: 'Stendhal',isbn:'9782070360178',categoryId:2} })
await prisma.book.create({data:{title: 'Les Misérables',author: 'Victor Hugo',isbn:'9782070409228',categoryId:2} })
await prisma.book.create({data:{title: 'L\'Étranger',author: 'Albert Camus',isbn:'9782070360024',categoryId:2} })
await prisma.book.create({data:{title: 'Germinal',author: 'Émile Zola',isbn:'9782070411429',categoryId:2} })
await prisma.book.create({data:{title: 'Le Père Goriot',author: 'Honoré de Balzac',isbn:'9782070409341',categoryId:2} })
await prisma.book.create({data:{title: 'Le Grand Meaulnes',author: 'Alain-Fournier',isbn:'9780140182828',categoryId:2} })



// await prisma.$executeRawUnsafe(`Insert into Book(title, author, isbn) VALUES('Le Petit Prince','Antoine de Saint‑Exupéry','9782070612758');`)






  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()