import { z } from "zod";

export const formSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(1, { error: "O nome é obrigatório" }),

  descricao: z
    .string()
    .trim()
    .min(1, { error: "A descrição é obrigatória" }),

  classe: z.enum(
    ["Mago", "Paladino", "Caçador", "Druida", "Qualquer"],
    { error: "Classe inválida" }
  ),

  tipo: z.enum(["Magia", "Criatura"], {
    error: "Tipo inválido",
  }),

  ataque: z
    .number({ error: "Ataque é obrigatório" })
    .int({ error: "Ataque deve ser inteiro" })
    .min(0, { error: "Ataque mínimo é 0" })
    .max(10, { error: "Ataque máximo é 10" }),

  defesa: z
    .number({ error: "Defesa é obrigatória" })
    .int({ error: "Defesa deve ser inteiro" })
    .min(0, { error: "Defesa mínima é 0" })
    .max(10, { error: "Defesa máxima é 10" }),
});