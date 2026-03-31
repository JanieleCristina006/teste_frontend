import {
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Flame,
  Sparkles,
  Crosshair,
  Circle,
  Plus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { CardFilters } from "./Filters";
import type { Carta } from "../../types/card";
import type { CardTableProps } from "../../types/cardTableProps";

const classStyles = {
  Mago: {
    badge: "bg-blue-100 text-blue-700",
    iconWrap: "bg-blue-50 text-blue-600",
    icon: Sparkles,
  },
  Druida: {
    badge: "bg-green-100 text-green-700",
    iconWrap: "bg-green-50 text-green-600",
    icon: Shield,
  },
  Paladino: {
    badge: "bg-orange-100 text-orange-700",
    iconWrap: "bg-orange-50 text-orange-600",
    icon: Flame,
  },
  ["Caçador"]: {
    badge: "bg-amber-100 text-amber-700",
    iconWrap: "bg-amber-50 text-amber-600",
    icon: Crosshair,
  },
  Qualquer: {
    badge: "bg-slate-100 text-slate-700",
    iconWrap: "bg-slate-100 text-slate-600",
    icon: Circle,
  },
} satisfies Record<
  Carta["classe"],
  {
    badge: string;
    iconWrap: string;
    icon: LucideIcon;
  }
>;

export const Table = ({
  dados,
  totalCartas,
  paginaAtual,
  totalPaginas,
  filtros,
  onChangeFiltros,
  onLimparFiltros,
  onPaginaAnterior,
  onProximaPagina,
  onIrParaPagina,
  onNovaCarta,
  onEditar,
  onExcluir,
}: CardTableProps) => {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1F3C88]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="5" width="16" height="14" rx="2" />
              <path d="M8 5v14" />
              <path d="M16 5v14" />
              <path d="M4 10h16" />
            </svg>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#334155] sm:text-[18px]">
              Listagem de Cartas
            </h3>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1F3C88]">
            cartas ({totalCartas})
          </span>

          <CardFilters
            filtros={filtros}
            onChangeFiltros={onChangeFiltros}
            onLimparFiltros={onLimparFiltros}
          />

          <button
            onClick={onNovaCarta}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#e66000] sm:w-auto"
          >
            <Plus size={16} />
            Nova Carta
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-220 border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-white text-left">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  ID
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Nome
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Descrição
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Classe
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Tipo
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  ATQ/DEF
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {dados.map((card) => {
                const config =
                  classStyles[card.classe as keyof typeof classStyles] ??
                  classStyles.Qualquer;

                const Icon = config.icon;

                return (
                  <tr
                    key={card.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/70 last:border-b-0"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-[#1F3C88]">
                      #{card.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${config.iconWrap}`}
                        >
                          <Icon size={15} />
                        </div>

                        <span className="text-sm font-semibold text-[#1F3C88]">
                          {card.nome}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger asChild>
                            <p className="max-w-65 cursor-pointer truncate">
                              {card.descricao}
                            </p>
                          </Tooltip.Trigger>

                          <Tooltip.Portal>
                            <Tooltip.Content
                              className="max-w-xs rounded-lg bg-black px-3 py-2 text-xs text-white shadow-md"
                              side="top"
                            >
                              {card.descricao}
                              <Tooltip.Arrow className="fill-black" />
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.badge}`}
                      >
                        {card.classe}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {card.tipo}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-[#1F3C88]">
                      {card.ataque} <span className="text-slate-300">/</span>{" "}
                      {card.defesa}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => onEditar(card)}
                          className="text-[#1F3C88] transition hover:opacity-70"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          onClick={() => onExcluir(card)}
                          className="text-red-500 transition hover:opacity-70"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {dados.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-400"
                  >
                    Nenhuma carta encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-slate-100 lg:hidden">
          {dados.map((card) => {
            const config =
              classStyles[card.classe as keyof typeof classStyles] ??
              classStyles.Qualquer;

            const Icon = config.icon;

            return (
              <article key={card.id} className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.iconWrap}`}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        #{card.id}
                      </p>
                      <h4 className="truncate text-sm font-semibold text-[#1F3C88]">
                        {card.nome}
                      </h4>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => onEditar(card)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#1F3C88] transition hover:opacity-70"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() => onExcluir(card)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:opacity-70"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <p className="text-sm leading-6 text-slate-500">
                  {card.descricao}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Classe
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${config.badge}`}
                    >
                      {card.classe}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Tipo
                    </p>
                    <p className="mt-2 font-medium text-slate-600">
                      {card.tipo}
                    </p>
                  </div>

                  <div className="col-span-2 rounded-2xl bg-slate-50 px-3 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      ATQ/DEF
                    </p>
                    <p className="mt-2 font-semibold text-[#1F3C88]">
                      {card.ataque} <span className="text-slate-300">/</span>{" "}
                      {card.defesa}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}

          {dados.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-slate-400">
              Nenhuma carta encontrada.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          <span className="text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400 lg:text-left">
            Página {paginaAtual} de {totalPaginas}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
            <button
              onClick={onPaginaAnterior}
              disabled={paginaAtual === 1}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => {
              const pagina = index + 1;

              return (
                <button
                  key={pagina}
                  onClick={() => onIrParaPagina(pagina)}
                    className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold transition ${
                    pagina === paginaAtual
                      ? "bg-[#ff6b06] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {pagina}
                </button>
              );
            })}

            <button
              onClick={onProximaPagina}
              disabled={paginaAtual === totalPaginas}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
