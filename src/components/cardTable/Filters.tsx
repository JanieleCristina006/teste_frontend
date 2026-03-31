import { Search, Filter, Layers, Shapes } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Popover from "@radix-ui/react-popover";
import type { CardFilters as CardFiltersType } from "../../types/cardFilters";
import type { CardFiltersProps } from "../../types/cardFiltersProps";

export const CardFilters = ({
  filtros,
  onChangeFiltros,
  onLimparFiltros,
}: CardFiltersProps) => {
  function handleChange<K extends keyof CardFiltersType>(
    campo: K,
    valor: CardFiltersType[K]
  ) {
    onChangeFiltros({
      ...filtros,
      [campo]: valor,
    });
  }

  const filtrosAtivos =
    filtros.id !== "" ||
    filtros.nome !== "" ||
    filtros.classe !== "" ||
    filtros.tipo !== "";

  return (
    <Tooltip.Provider delayDuration={150}>
      <Popover.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Popover.Trigger asChild>
              <button
                type="button"
                className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                  filtrosAtivos
                    ? "border-[#ff6b06] bg-[#fff1e8] text-[#ff6b06]"
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Filter size={18} />
                {filtrosAtivos && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ff6b06]" />
                )}
              </button>
            </Popover.Trigger>
          </Tooltip.Trigger>

          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              className="rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-lg"
            >
              Filtros
              <Tooltip.Arrow className="fill-slate-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="end"
            sideOffset={10}
            className="z-50 w-[calc(100vw-1.5rem)] max-w-88 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] outline-none sm:w-90"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#ff6b06]">
                <Filter size={16} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Filtrar cartas
                </h3>
                <p className="text-xs text-slate-400">
                  Consulte por ID, nome, classe e tipo
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">
                  ID da carta
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="number"
                    value={filtros.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                    placeholder="Ex: 1024"
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">
                  Nome
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                  <Search size={14} className="text-slate-400" />
                  <input
                    type="text"
                    value={filtros.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    placeholder="Nome da carta..."
                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">
                  Classe
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                  <Layers size={14} className="text-slate-400" />
                  <select
                    value={filtros.classe}
                    onChange={(e) =>
                      handleChange(
                        "classe",
                        e.target.value as CardFiltersType["classe"]
                      )
                    }
                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  >
                    <option value="">Todas</option>
                    <option value="Qualquer">Qualquer</option>
                    <option value="Mago">Mago</option>
                    <option value="Paladino">Paladino</option>
                    <option value="Caçador">Caçador</option>
                    <option value="Druida">Druida</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">
                  Tipo
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
                  <Shapes size={14} className="text-slate-400" />
                  <select
                    value={filtros.tipo}
                    onChange={(e) =>
                      handleChange(
                        "tipo",
                        e.target.value as CardFiltersType["tipo"]
                      )
                    }
                    className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  >
                    <option value="">Todos</option>
                    <option value="Magia">Magia</option>
                    <option value="Criatura">Criatura</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onLimparFiltros}
                className="w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 sm:w-auto"
              >
                Limpar
              </button>

              <Popover.Close asChild>
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#ff6b06] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#e66000] sm:w-auto"
                >
                  Aplicar
                </button>
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Tooltip.Provider>
  );
};
