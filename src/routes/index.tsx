import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { perfil, projetos, competencias } from "@/data/portfolio";
import curriculoPdf from "@/assets/curriculo.pdf.asset.json";

const title = "Anderson Andrade — Especialista em Implantação e Projetos Digitais";
const description =
  "Portfólio de Anderson Andrade: implantação de e-commerce (VTEX, Nuvemshop, Shopify), gestão de projetos digitais, integrações com ERPs, marketplaces e APIs.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const destaquesProjetos = projetos.slice(0, 3);

  return (
    <SiteLayout>
      <section className="hero-glow border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-24 md:py-32">
          <p className="animate-rise text-xs uppercase tracking-[0.25em] text-accent-foreground">
            {perfil.cidade}
          </p>
          <h1 className="animate-rise mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] md:text-6xl">
            {perfil.nome}
          </h1>
          <p className="animate-rise mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {perfil.cargo}
          </p>
          <p className="animate-rise mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {perfil.resumoCurto}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-3">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver projetos <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={curriculoPdf.url}
              download="Anderson-Andrade-Curriculo.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
            >
              <Download className="h-4 w-4" /> Baixar currículo
            </a>
          </div>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {perfil.destaques.map((d) => (
              <div key={d.rotulo} className="bg-card px-6 py-7">
                <dt className="font-display text-3xl font-semibold text-foreground">
                  {d.valor}
                </dt>
                <dd className="mt-2 text-sm text-muted-foreground">{d.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Projetos em destaque</h2>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {destaquesProjetos.map((p) => (
            <Link
              key={p.slug}
              to="/projetos/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60"
            >
              <span className="text-xs uppercase tracking-widest text-accent-foreground">
                {p.plataforma}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.resumo}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                Ver estudo de caso
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto w-full max-w-6xl px-5 py-20">
          <h2 className="text-2xl font-semibold md:text-3xl">Como eu atuo</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {competencias.slice(0, 3).map((c) => (
              <div key={c.grupo}>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
                  {c.grupo}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {c.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            to="/sobre"
            className="mt-10 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Conhecer o perfil completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
