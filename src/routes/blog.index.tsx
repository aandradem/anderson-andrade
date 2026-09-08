import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { posts } from "@/data/portfolio";

const title = "Blog — Anderson Andrade";
const description =
  "Artigos sobre implantação de e-commerce, gestão de projetos digitais, integrações com ERPs e marketplaces.";
const url = "https://anderson-andrade.lovable.app/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: Blog,
});

export function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function Blog() {
  const ordenados = [...posts].sort((a, b) => b.data.localeCompare(a.data));

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-5 py-20">
          <h1 className="text-3xl font-semibold md:text-5xl">Blog</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Anotações sobre o dia a dia de implantação de e-commerce, gestão de
            projetos e integrações.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 py-16">
        {ordenados.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum artigo publicado ainda.
          </p>
        ) : (
          <ul className="space-y-5">
            {ordenados.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/60"
                >
                  <span className="text-xs uppercase tracking-widest text-accent-foreground">
                    {formatarData(p.data)}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold md:text-xl">{p.titulo}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                    Ler artigo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}
