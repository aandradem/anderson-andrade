import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CtaContato } from "@/components/CtaContato";
import { projetos } from "@/data/portfolio";

export const Route = createFileRoute("/projetos/$slug")({
  loader: ({ params }) => {
    const projeto = projetos.find((p) => p.slug === params.slug);
    if (!projeto) throw notFound();
    return { projeto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Projeto não encontrado — Anderson Andrade" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const t = `${loaderData.projeto.titulo} — Anderson Andrade`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.projeto.resumo },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.projeto.resumo },
      ],
    };
  },
  notFoundComponent: ProjetoNaoEncontrado,
  component: ProjetoDetalhe,
});

function ProjetoNaoEncontrado() {
  return (
    <SiteLayout>
      <div className="mx-auto w-full max-w-3xl px-5 py-28 text-center">
        <h1 className="text-3xl font-semibold">Projeto não encontrado</h1>
        <p className="mt-4 text-muted-foreground">
          Este estudo de caso não existe ou foi movido.
        </p>
        <Link
          to="/projetos"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Ver todos os projetos
        </Link>
      </div>
    </SiteLayout>
  );
}

function Bloco({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-7">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
        {titulo}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {itens.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjetoDetalhe() {
  const { projeto } = Route.useLoaderData();

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-5 py-16">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Projetos
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-accent-foreground">
            <span>{projeto.plataforma}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{projeto.ano}</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold md:text-5xl">{projeto.titulo}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{projeto.cliente}</p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {projeto.resumo}
          </p>
          {projeto.exemplo && (
            <p className="mt-6 rounded-md border border-border bg-surface px-4 py-3 text-xs text-muted-foreground">
              Case representativo do tipo de projeto conduzido — pronto para ser
              substituído por um projeto real.
            </p>
          )}
          {projeto.link && (
            <a
              href={projeto.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-md border border-border px-4 py-2 text-sm hover:bg-surface"
            >
              Visitar projeto
            </a>
          )}

          {projeto.metricas && (
            <dl className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {projeto.metricas.map((m) => (
                <div key={m.rotulo} className="bg-card px-6 py-6">
                  <dt className="font-display text-2xl font-semibold text-primary">
                    {m.valor}
                  </dt>
                  <dd className="mt-2 text-sm text-muted-foreground">{m.rotulo}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl space-y-5 px-5 py-16">
        <div className="rounded-lg border border-border bg-card p-7">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
            O desafio
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {projeto.desafio}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-7">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
            A solução — condução do projeto
          </h2>
          <ol className="mt-5 space-y-4">
            {projeto.solucao.map((s, i) => (
              <li key={s} className="flex gap-4 text-sm leading-relaxed">
                <span className="font-display text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Bloco titulo="Integrações" itens={projeto.integracoes} />
          <Bloco titulo="O resultado" itens={projeto.resultados} />
        </div>

        <ul className="flex flex-wrap gap-2 pt-2">
          {projeto.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <CtaContato />
    </SiteLayout>
  );
}
