import { z } from "zod";

export const textSchema = z.object({
  title: z.string().min(5).optional(),
  text: z.string().min(500).max(4000, {
    message: "Sua redação precisa pode ter no maximo 4000 caracteres  ",
  }),
});
