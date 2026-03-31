import type { Carta } from "./card";
import type { CardFilters } from "./cardFilters";

export type CardTableProps = {
  dados: Carta[];
  totalCartas: number;
  paginaAtual: number;
  totalPaginas: number;
  filtros: CardFilters;
  onChangeFiltros: (filtros: CardFilters) => void;
  onLimparFiltros: () => void;
  onPaginaAnterior: () => void;
  onProximaPagina: () => void;
  onIrParaPagina: (pagina: number) => void;
  onNovaCarta: () => void;
  onEditar: (carta: Carta) => void;
  onExcluir: (carta: Carta) => void;
};
