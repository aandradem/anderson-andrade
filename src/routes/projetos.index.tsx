import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { projetos } from "@/data/portfolio";

const title = "Projetos — Anderson Andrade";
const description =
  "Cases de implantação, migração e integração de e-commerce em VTEX, Nuvemshop e Shopify conduzidos por Anderson Andrade.";

export const Route = createFileRoute("/projetos/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Projetos,
});

function Projetos() {
  const plataformas = useMemo(
    () => ["Todas", ...Array.from(new Set(projetos.map((p) => p.plataforma)))],
    [],
  );
  const [filtro, setFiltro] = useState("Todas");
  const lista = projetos.filter((p) => filtro === "Todas" || p.plataforma === filtro);

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <h1 className="text-3xl font-semibold md:text-5xl">Projetos</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Seleção de projetos de e-commerce conduzidos de ponta a ponta — do
            levantamento de requisitos e parametrização às integrações, homologação e
            go-live.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {plataformas.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFiltro(p)}
                className={
                  filtro === p
                    ? "rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                    : "rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {lista.map((p) => (
            <Link
              key={p.slug}
              to="/projetos/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/60"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-widest text-accent-foreground">
                  {p.plataforma}
                </span>
                <span className="text-xs text-muted-foreground">{p.ano}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{p.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.cliente}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.resumo}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                Ver estudo de caso
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
