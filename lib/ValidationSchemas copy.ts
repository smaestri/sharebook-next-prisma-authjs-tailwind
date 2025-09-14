import z from "zod";

export const bookSchema = z.object({
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
})

export type BookType = z.infer<typeof bookSchema>

