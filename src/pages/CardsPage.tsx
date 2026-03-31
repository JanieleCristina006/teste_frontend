import { useEffect, useMemo, useState } from "react";
import { X, TriangleAlert } from "lucide-react";
import toast from "react-hot-toast";
import { ModalCadastrar } from "../components/cardTable/ModalCadastrar";
import { Table } from "../components/cardTable/Table";
import { deleteCarta, getCartas } from "../services/localStorage";
import type { Carta } from "../types/card";
import type { CardFilters } from "../types/cardFilters";

export const CardsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [cartaEmEdicao, setCartaEmEdicao] = useState<Carta | null>(null);
  const [cartaParaExcluir, setCartaParaExcluir] = useState<Carta | null>(null);

  const [filtros, setFiltros] = useState<CardFilters>({
    id: "",
    nome: "",
    classe: "",
    tipo: "",
  });

  const [dados, setDados] = useState<Carta[]>([]);
  const itensPorPagina = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDados(getCartas());
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  function atualizarCartas() {
    const cartas = getCartas();
    setDados(cartas);

    const totalPaginasAtualizado = Math.max(
      1,
      Math.ceil(cartas.length / itensPorPagina),
    );

    if (paginaAtual > totalPaginasAtualizado) {
      setPaginaAtual(totalPaginasAtualizado);
    }

    setIsModalOpen(false);
    setCartaEmEdicao(null);
    setCartaParaExcluir(null);
  }

  function limparFiltros() {
    setFiltros({
      id: "",
      nome: "",
      classe: "",
      tipo: "",
    });
    setPaginaAtual(1);
  }

  function abrirNovaCarta() {
    setCartaEmEdicao(null);
    setIsModalOpen(true);
  }

  function abrirEdicao(carta: Carta) {
    setCartaEmEdicao(carta);
    setIsModalOpen(true);
  }

  function fecharModal() {
    setIsModalOpen(false);
    setCartaEmEdicao(null);
  }

  function abrirExcluir(carta: Carta) {
    setCartaParaExcluir(carta);
  }

  function fecharExcluir() {
    setCartaParaExcluir(null);
  }

  function confirmarExcluir() {
    if (!cartaParaExcluir) return;

    deleteCarta(cartaParaExcluir.id);
    toast.success("Carta excluída com sucesso!");
    atualizarCartas();
  }

  const dadosFiltrados = useMemo(() => {
    return dados.filter((carta) => {
      const bateId =
        filtros.id.trim() === "" ||
        String(carta.id).includes(filtros.id.trim());

      const bateNome =
        filtros.nome.trim() === "" ||
        carta.nome.toLowerCase().includes(filtros.nome.toLowerCase().trim());

      const bateClasse =
        filtros.classe === "" || carta.classe === filtros.classe;

      const bateTipo = filtros.tipo === "" || carta.tipo === filtros.tipo;

      return bateId && bateNome && bateClasse && bateTipo;
    });
  }, [dados, filtros]);

  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina) || 1;

  const dadosPaginados = useMemo(() => {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return dadosFiltrados.slice(inicio, fim);
  }, [dadosFiltrados, paginaAtual]);

  function irParaPagina(page: number) {
    if (page < 1 || page > totalPaginas) return;
    setPaginaAtual(page);
  }

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual((prev) => prev - 1);
    }
  }

  function proximaPagina() {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual((prev) => prev + 1);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-4 sm:px-4 sm:py-6 lg:flex lg:items-center lg:justify-center lg:px-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-7xl justify-center">
        <div className="w-full max-w-6xl space-y-4 sm:space-y-5">
          <section className="rounded-[28px] bg-white/80 px-4 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/70 backdrop-blur sm:px-6">
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1E293B] sm:text-[32px]">
              Gerenciamento de Cartas
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Consulte, crie, edite e remova cartas do sistema.
            </p>
          </section>

          {isLoading ? (
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-5">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-52 rounded-md bg-slate-200" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
                <div className="h-12 w-full rounded-xl bg-slate-100" />
              </div>
            </div>
          ) : (
            <Table
              dados={dadosPaginados}
              totalCartas={dadosFiltrados.length}
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              filtros={filtros}
              onChangeFiltros={(novosFiltros) => {
                setFiltros(novosFiltros);
                setPaginaAtual(1);
              }}
              onLimparFiltros={limparFiltros}
              onPaginaAnterior={paginaAnterior}
              onProximaPagina={proximaPagina}
              onIrParaPagina={irParaPagina}
              onNovaCarta={abrirNovaCarta}
              onEditar={abrirEdicao}
              onExcluir={abrirExcluir}
            />
          )}

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-3 backdrop-blur-[2px] sm:items-center sm:p-4">
              <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {cartaEmEdicao ? "Editar carta" : "Criar nova carta"}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {cartaEmEdicao
                        ? "Altere os dados abaixo para atualizar a carta."
                        : "Preencha os dados abaixo para cadastrar uma nova carta."}
                    </p>
                  </div>

                  <button
                    onClick={fecharModal}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4 sm:p-6">
                  <ModalCadastrar
                    atualizarCartas={atualizarCartas}
                    cartaEmEdicao={cartaEmEdicao}
                    onFechar={fecharModal}
                  />
                </div>
              </div>
            </div>
          )}

          {cartaParaExcluir && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-3 backdrop-blur-[2px] sm:items-center sm:p-4">
              <div className="w-full max-w-md rounded-[28px] bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 sm:h-12 sm:w-12">
                    <TriangleAlert size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Excluir carta
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Tem certeza que deseja excluir a carta{" "}
                      <span className="font-semibold text-slate-700">
                        {cartaParaExcluir.nome}
                      </span>
                      ?
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Essa ação não poderá ser desfeita.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                  <button
                    onClick={fecharExcluir}
                    className="w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 sm:w-auto"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={confirmarExcluir}
                    className="w-full rounded-xl bg-[#ff6b06] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#e66000] sm:w-auto"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
