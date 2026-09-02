import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { CtaContato } from "@/components/CtaContato";
import {
  perfil,
  experiencias,
  formacao,
  certificacoes,
  formacaoComplementar,
  tecnologias,
} from "@/data/portfolio";
import curriculoPdf from "@/assets/curriculo.pdf.asset.json";

const title = "Currículo — Anderson Andrade";
const description =
  "Experiência profissional, formação, certificações e tecnologias de Anderson Andrade, analista de implantação e projetos de e-commerce.";

export const Route = createFileRoute("/curriculo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Curriculo,
});

function Curriculo() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-6 px-5 py-20">
          <div>
            <h1 className="text-3xl font-semibold md:text-5xl">Currículo</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">{perfil.cargo}</p>
          </div>
          <a
            href={curriculoPdf.url}
            download="Anderson-Andrade-Curriculo.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Baixar em PDF
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Experiência profissional</h2>
        <div className="mt-10 space-y-10 border-l border-border pl-6">
          {experiencias.map((e) => (
            <article key={e.empresa} className="relative">
              <span className="absolute -left-[1.65rem] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.cargo}</h3>
                <span className="text-xs text-muted-foreground">{e.periodo}</span>
              </div>
              <p className="mt-1 text-sm text-accent-foreground">
                {e.empresa} — {e.local}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {e.descricao}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {e.itens.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto grid w-full max-w-5xl gap-5 px-5 py-16 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-7">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              Formação acadêmica
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {formacao.map((f) => (
                <li key={f.curso}>
                  <span className="text-foreground">{f.curso}</span>
                  <br />
                  {f.instituicao}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-7">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              Certificações
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {certificacoes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-7 md:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
              Formação complementar em gestão de projetos
            </h2>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {formacaoComplementar.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">Tecnologias e plataformas</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tecnologias.map((t) => (
            <div key={t.grupo} className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-accent-foreground">
                {t.grupo}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.itens.map((i) => (
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

      <CtaContato
        titulo="Quer conversar sobre uma vaga ou projeto?"
        texto="Currículo em PDF disponível acima. Para falar diretamente comigo, escolha um dos canais abaixo."
      />
    </SiteLayout>
  );
}
