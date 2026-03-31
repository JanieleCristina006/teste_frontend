import type { CardFilters } from "./cardFilters";

export type CardFiltersProps = {
  filtros: CardFilters;
  onChangeFiltros: (filtros: CardFilters) => void;
  onLimparFiltros: () => void;
};
