import type { z } from "zod";

import { formSchema } from "../schemas/formSchema";
import type { Carta } from "./card";

export type ModalCadastrarFormData = z.infer<typeof formSchema>;

export type ModalCadastrarProps = {
  atualizarCartas: () => void;
  cartaEmEdicao: Carta | null;
  onFechar: () => void;
};
