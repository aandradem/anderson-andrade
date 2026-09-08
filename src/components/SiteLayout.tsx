import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { perfil } from "@/data/portfolio";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projetos", label: "Projetos" },
  { to: "/blog", label: "Blog" },
  { to: "/curriculo", label: "Currículo" },
  { to: "/contato", label: "Contato" },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {nav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          activeProps={{ className: "text-foreground" }}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <Link to="/" className="font-display text-sm font-semibold tracking-tight">
            {perfil.nome}
            <span className="ml-2 text-muted-foreground">/ portfólio</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <NavLinks />
          </nav>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t border-border px-5 py-4 md:hidden">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {perfil.nome} — {perfil.cidade}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a className="hover:text-foreground" href={`mailto:${perfil.email}`}>
              {perfil.email}
            </a>
            <a
              className="hover:text-foreground"
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
