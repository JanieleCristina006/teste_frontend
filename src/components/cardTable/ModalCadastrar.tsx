import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../schemas/formSchema";
import toast from "react-hot-toast";
import { createCarta, updateCarta } from "../../services/localStorage";
import type {
  ModalCadastrarFormData,
  ModalCadastrarProps,
} from "../../types/modalCadastrarTypes";

export const ModalCadastrar = ({
  atualizarCartas,
  cartaEmEdicao,
  onFechar,
}: ModalCadastrarProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModalCadastrarFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      classe: "Qualquer",
      tipo: "Magia",
      ataque: undefined,
      defesa: undefined,
    },
  });

  useEffect(() => {
    if (cartaEmEdicao) {
      reset({
        nome: cartaEmEdicao.nome,
        descricao: cartaEmEdicao.descricao,
        classe: cartaEmEdicao.classe,
        tipo: cartaEmEdicao.tipo,
        ataque: cartaEmEdicao.ataque,
        defesa: cartaEmEdicao.defesa,
      });
      return;
    }

    reset({
      nome: "",
      descricao: "",
      classe: "Qualquer",
      tipo: "Magia",
      ataque: undefined,
      defesa: undefined,
    });
  }, [cartaEmEdicao, reset]);

  function handleSave(data: ModalCadastrarFormData) {
    if (cartaEmEdicao) {
      updateCarta(cartaEmEdicao.id, data);
      toast.success("Carta atualizada com sucesso!");
    } else {
      createCarta(data);
      toast.success("Carta criada com sucesso!");
    }

    atualizarCartas();
    onFechar();
  }

  function handleCancelar() {
    onFechar();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleSave)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-slate-400">
            Nome da carta
          </label>
          <input
            type="text"
            {...register("nome")}
            placeholder="Ex: Dragão Ancestral"
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.nome
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          />
          {errors.nome && (
            <p className="text-xs text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-medium text-slate-400">
            Descrição
          </label>
          <textarea
            rows={4}
            {...register("descricao")}
            placeholder="Descreva a carta..."
            className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.descricao
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          />
          {errors.descricao && (
            <p className="text-xs text-red-500">{errors.descricao.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Classe</label>
          <select
            {...register("classe")}
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.classe
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <option value="Qualquer">Qualquer</option>
            <option value="Mago">Mago</option>
            <option value="Paladino">Paladino</option>
            <option value="Caçador">Caçador</option>
            <option value="Druida">Druida</option>
          </select>
          {errors.classe && (
            <p className="text-xs text-red-500">{errors.classe.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Tipo</label>
          <select
            {...register("tipo")}
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.tipo
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            <option value="Magia">Magia</option>
            <option value="Criatura">Criatura</option>
          </select>
          {errors.tipo && (
            <p className="text-xs text-red-500">{errors.tipo.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Ataque</label>
          <input
            type="number"
            min={0}
            max={10}
            step={1}
            {...register("ataque", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            placeholder="0"
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.ataque
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          />
          {errors.ataque && (
            <p className="text-xs text-red-500">{errors.ataque.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Defesa</label>
          <input
            type="number"
            min={0}
            max={10}
            step={1}
            {...register("defesa", {
              setValueAs: (value) =>
                value === "" ? undefined : Number(value),
            })}
            placeholder="0"
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none ${
              errors.defesa
                ? "border border-red-500 bg-red-50 text-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          />
          {errors.defesa && (
            <p className="text-xs text-red-500">{errors.defesa.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancelar}
          className="w-full rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 sm:w-auto"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6b06] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#e66000] sm:w-auto"
        >
          <Save size={16} />
          {cartaEmEdicao ? "Salvar alterações" : "Salvar carta"}
        </button>
      </div>
    </form>
  );
};
