import type { ReactNode } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

const base =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary";

export function Campo({
  label,
  valor,
  onChange,
  placeholder,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        className={base}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function Area({
  label,
  valor,
  onChange,
  ajuda,
  linhas = 4,
}: {
  label: string;
  valor: string;
  onChange: (v: string) => void;
  ajuda?: string;
  linhas?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <textarea
        className={`${base} leading-relaxed`}
        rows={linhas}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      {ajuda && <span className="mt-1 block text-xs text-muted-foreground">{ajuda}</span>}
    </label>
  );
}

/** Lista de textos editada como uma linha por item. */
export function ListaTexto({
  label,
  itens,
  onChange,
  linhas = 4,
}: {
  label: string;
  itens: string[];
  onChange: (v: string[]) => void;
  linhas?: number;
}) {
  return (
    <Area
      label={label}
      linhas={linhas}
      ajuda="Um item por linha."
      valor={itens.join("\n")}
      onChange={(v) =>
        onChange(
          v
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
        )
      }
    />
  );
}

export function Cartao({
  titulo,
  indice,
  total,
  onMover,
  onRemover,
  children,
}: {
  titulo: string;
  indice: number;
  total: number;
  onMover: (de: number, para: number) => void;
  onRemover: (i: number) => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="truncate text-sm font-semibold">{titulo || "(sem título)"}</h3>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            aria-label="Mover para cima"
            disabled={indice === 0}
            onClick={() => onMover(indice, indice - 1)}
            className="rounded-md border border-border p-1.5 disabled:opacity-30"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Mover para baixo"
            disabled={indice === total - 1}
            onClick={() => onMover(indice, indice + 1)}
            className="rounded-md border border-border p-1.5 disabled:opacity-30"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Remover"
            onClick={() => onRemover(indice)}
            className="rounded-md border border-border p-1.5 text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

export function BotaoAdicionar({ onClick, texto }: { onClick: () => void; texto: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Plus className="h-4 w-4" /> {texto}
    </button>
  );
}

export function mover<T>(lista: T[], de: number, para: number): T[] {
  if (para < 0 || para >= lista.length) return lista;
  const copia = [...lista];
  const [item] = copia.splice(de, 1);
  copia.splice(para, 0, item as T);
  return copia;
}
