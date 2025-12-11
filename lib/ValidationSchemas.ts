import z from "zod";

export const bookSchema = z.object({
  bookId: z.number().optional(),
  image: z.string(),
  title: z.string().min(2, {
    message: "Le titre du livre doit avoir au moins 2 caractères.",
  }),
  author: z.string().min(2, {
    message: "L'auteur doit avoir au moins 2 caractères.",
  }),
  category: z.string().min(1, {
    message: "La catégorie est requise.",
  }),
  description: z.string().min(2, {
    message: "La description est requise.",
  }),
  price: z.number(),
  isFree: z.string(),
})

export const userInfoSchema = z.object({
  pseudo: z.string().min(4, {
    message: "Mercid'indiquer un pseudo avec au moins 4 charactères.",
  }),
  city: z.string().min(2, {
    message: "Mercid'indiquer la ville",
  }),
  street: z.string().min(2, {
    message: "Merci d'indiquer la rue et le numéro",
  }),

})

export type BookType = z.infer<typeof bookSchema>

export type UserInfoType = z.infer<typeof userInfoSchema>