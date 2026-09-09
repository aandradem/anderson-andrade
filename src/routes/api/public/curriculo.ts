import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/curriculo")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data } = await supabaseAdmin
          .from("site_content")
          .select("value")
          .eq("key", "curriculoPath")
          .maybeSingle();
        const path = typeof data?.value === "string" ? data.value : null;
        if (!path) return new Response("Currículo não disponível", { status: 404 });

        const file = await supabaseAdmin.storage.from("arquivos").download(path);
        if (file.error || !file.data) {
          return new Response("Currículo não disponível", { status: 404 });
        }
        return new Response(await file.data.arrayBuffer(), {
          headers: {
            "content-type": "application/pdf",
            "content-disposition": 'attachment; filename="Anderson-Andrade-Curriculo.pdf"',
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
