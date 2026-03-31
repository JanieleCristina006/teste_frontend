export type Carta = {
  id: number;
  nome: string;
  descricao: string;
  classe: "Mago" | "Druida" | "Paladino" | "Caçador" | "Qualquer";
  tipo: "Criatura" | "Magia";
  ataque: number;
  defesa: number;
};
