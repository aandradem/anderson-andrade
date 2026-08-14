import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { perfil } from "@/data/portfolio";

const title = "Contato — Anderson Andrade";
const description =
  "Fale com Anderson Andrade sobre projetos de implantação de e-commerce, integrações e gestão de projetos digitais.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contato,
});

function Contato() {
  const canais = [
    {
      icone: Mail,
      rotulo: "E-mail",
      valor: perfil.email,
      href: `mailto:${perfil.email}`,
    },
    {
      icone: Phone,
      rotulo: "Telefone / WhatsApp",
      valor: perfil.telefone,
      href: `tel:${perfil.telefoneLink}`,
    },
    {
      icone: Linkedin,
      rotulo: "LinkedIn",
      valor: perfil.linkedinLabel,
      href: perfil.linkedin,
    },
  ];

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-4xl px-5 py-24">
        <h1 className="text-3xl font-semibold md:text-5xl">Vamos conversar</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
          Disponível para projetos e oportunidades em implantação de e-commerce, gestão
          de projetos digitais e integrações de sistemas.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {canais.map((c) => (
            <a
              key={c.rotulo}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60"
            >
              <c.icone className="mt-0.5 h-5 w-5 text-primary" />
              <span>
                <span className="block text-xs uppercase tracking-widest text-accent-foreground">
                  {c.rotulo}
                </span>
                <span className="mt-1 block text-sm text-foreground">{c.valor}</span>
              </span>
            </a>
          ))}

          <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-6">
            <MapPin className="mt-0.5 h-5 w-5 text-primary" />
            <span>
              <span className="block text-xs uppercase tracking-widest text-accent-foreground">
                Localização
              </span>
              <span className="mt-1 block text-sm text-foreground">{perfil.cidade}</span>
            </span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
