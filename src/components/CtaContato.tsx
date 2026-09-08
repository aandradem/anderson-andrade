import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { perfil } from "@/data/portfolio";

type Props = {
  titulo?: string;
  texto?: string;
};

/** Bloco de fechamento com chamadas para ação — usado nas páginas internas. */
export function CtaContato({
  titulo = "Contato",
  texto = "Para saber mais sobre este trabalho ou trocar uma ideia, estes são os canais diretos.",
}: Props) {
  return (
    <section className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-4xl px-5 py-16">
        <h2 className="text-2xl font-semibold md:text-3xl">{titulo}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {texto}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={`mailto:${perfil.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
          >
            <Mail className="h-4 w-4" /> E-mail
          </a>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver todos os canais <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
