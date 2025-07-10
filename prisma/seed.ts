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

  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}


load()