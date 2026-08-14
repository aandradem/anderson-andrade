import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { perfil, competencias } from "@/data/portfolio";

const title = "Sobre — Anderson Andrade";
const description =
  "Perfil profissional, competências-chave e objetivo de Anderson Andrade, especialista em implantação de e-commerce e projetos digitais.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-5 py-20">
          <h1 className="text-3xl font-semibold md:text-5xl">Perfil profissional</h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            {perfil.perfilProfissional.map((p) => (
              <p key={p.slice(0, 30)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20">
        <h2 className="text-2xl font-semibold md:text-3xl">Competências-chave</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {competencias.map((c) => (
            <div key={c.grupo} className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
                {c.grupo}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.itens.map((i) => (
                  <li
                    key={i}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto w-full max-w-4xl px-5 py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Objetivo</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {perfil.objetivo}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
