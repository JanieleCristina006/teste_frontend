import type { Carta } from "./card";

export type CardFilters = {
  id: string;
  nome: string;
  classe: "" | Carta["classe"];
  tipo: "" | Carta["tipo"];
};
