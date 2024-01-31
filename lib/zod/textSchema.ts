import { z } from "zod";

export const textSchema = z.object({
  title: z.string().optional(),
  text: z
    .string()
    .min(500)
    .max(3500, {
      message: "Sua redação precisa pode ter no maximo 3500 caracteres  ",
    }),
});
