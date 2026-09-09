import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso restrito — Anderson Andrade" },
      { name: "description", content: "Área de administração do portfólio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Acesso,
});

function Acesso() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function entrar() {
    setCarregando(true);
    setErro(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setErro("Não foi possível entrar. Tente novamente.");
      setCarregando(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-md px-5 py-28">
        <h1 className="text-3xl font-semibold">Acesso restrito</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Entre com sua conta Google para atualizar o conteúdo do portfólio.
        </p>
        <button
          type="button"
          onClick={entrar}
          disabled={carregando}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" />
          {carregando ? "Entrando…" : "Entrar com Google"}
        </button>
        {erro && <p className="mt-4 text-sm text-destructive">{erro}</p>}
      </section>
    </SiteLayout>
  );
}
