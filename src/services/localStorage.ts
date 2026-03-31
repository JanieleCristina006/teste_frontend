import type { Carta } from "../types/card";

const CARTAS_STORAGE_KEY = "cartas";

export function getCartas(): Carta[] {
  const data = localStorage.getItem(CARTAS_STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Carta[];
  } catch {
    return [];
  }
}

export function saveCartas(cartas: Carta[]) {
  localStorage.setItem(CARTAS_STORAGE_KEY, JSON.stringify(cartas));
}

export function createCarta(cartaData: Omit<Carta, "id">): Carta {
  const cartas = getCartas();
  const novaCarta: Carta = {
    id: Date.now(),
    ...cartaData,
  };

  saveCartas([...cartas, novaCarta]);

  return novaCarta;
}

export function updateCarta(
  cartaId: Carta["id"],
  cartaData: Omit<Carta, "id">
): Carta | null {
  const cartas = getCartas();
  let cartaAtualizada: Carta | null = null;

  const cartasAtualizadas = cartas.map((carta) => {
    if (carta.id !== cartaId) {
      return carta;
    }

    cartaAtualizada = {
      ...carta,
      ...cartaData,
    };

    return cartaAtualizada;
  });

  saveCartas(cartasAtualizadas);

  return cartaAtualizada;
}

export function deleteCarta(cartaId: Carta["id"]) {
  const cartas = getCartas();
  const cartasAtualizadas = cartas.filter((carta) => carta.id !== cartaId);

  saveCartas(cartasAtualizadas);
}
