import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CtaContato } from "@/components/CtaContato";
import { posts, perfil } from "@/data/portfolio";

const base = "https://anderson-andrade.lovable.app";

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    const titulo = loaderData ? `${loaderData.titulo} — Anderson Andrade` : "Artigo";
    const descricao = loaderData?.resumo ?? "";
    const url = `${base}/blog/${params.slug}`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.titulo,
                description: loaderData.resumo,
                datePublished: loaderData.data,
                author: { "@type": "Person", name: perfil.nome },
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <SiteLayout>
      <article>
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-3xl px-5 py-16">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para o blog
            </Link>
            <p className="mt-8 text-xs uppercase tracking-widest text-accent-foreground">
              {formatarData(post.data)}
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              {post.titulo}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {post.resumo}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-5 py-14">
          <div className="space-y-5">
            {post.conteudo.map((bloco) =>
              bloco.startsWith("## ") ? (
                <h2
                  key={bloco}
                  className="pt-4 text-lg font-semibold text-foreground md:text-xl"
                >
                  {bloco.replace("## ", "")}
                </h2>
              ) : (
                <p
                  key={bloco.slice(0, 40)}
                  className="text-base leading-relaxed text-muted-foreground"
                >
                  {bloco}
                </p>
              ),
            )}
          </div>
        </section>
      </article>

      <CtaContato />
    </SiteLayout>
  );
}
