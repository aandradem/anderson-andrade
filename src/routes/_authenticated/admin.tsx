import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { LogOut, Save, Upload, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  siteContentQuery,
  type SiteContent,
  type Grupo,
  type Experiencia,
} from "@/lib/site-content";
import { saveSiteSection, getIsAdmin } from "@/lib/site-content.functions";
import type { Projeto, Post, Depoimento } from "@/data/portfolio";
import { Campo, Area, ListaTexto, Cartao, BotaoAdicionar, mover } from "@/components/admin/campos";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Anderson Andrade" },
      { name: "description", content: "Painel de edição do conteúdo do portfólio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const abas = [
  { id: "perfil", label: "Perfil" },
  { id: "projetos", label: "Projetos" },
  { id: "curriculo", label: "Currículo" },
  { id: "blog", label: "Blog" },
  { id: "depoimentos", label: "Depoimentos" },
] as const;

type AbaId = (typeof abas)[number]["id"];

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const conteudoSalvo = useSuspenseQuery(siteContentQuery).data;
  const verificarAdmin = useServerFn(getIsAdmin);
  const salvarSecao = useServerFn(saveSiteSection);
  const admin = useQuery({ queryKey: ["is-admin"], queryFn: () => verificarAdmin({}) });

  const [c, setC] = useState<SiteContent>(conteudoSalvo);
  const [aba, setAba] = useState<AbaId>("perfil");
  const [estado, setEstado] = useState<"parado" | "salvando" | "salvo" | "erro">("parado");

  useEffect(() => setC(conteudoSalvo), [conteudoSalvo]);

  function set<K extends keyof SiteContent>(chave: K, valor: SiteContent[K]) {
    setC((atual) => ({ ...atual, [chave]: valor }));
    setEstado("parado");
  }

  async function salvar(chaves: (keyof SiteContent)[]) {
    setEstado("salvando");
    try {
      for (const chave of chaves) {
        await salvarSecao({ data: { key: chave, value: c[chave] } });
      }
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setEstado("salvo");
    } catch {
      setEstado("erro");
    }
  }

  async function sair() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function enviarCurriculo(arquivo: File) {
    setEstado("salvando");
    try {
      const caminho = `curriculo/${Date.now()}-curriculo.pdf`;
      const { error } = await supabase.storage.from("arquivos").upload(caminho, arquivo, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (error) throw error;
      await salvarSecao({ data: { key: "curriculoPath", value: caminho } });
      setC((atual) => ({ ...atual, curriculoPath: caminho }));
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setEstado("salvo");
    } catch {
      setEstado("erro");
    }
  }

  if (admin.isLoading) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-4xl px-5 py-28 text-sm text-muted-foreground">
          Carregando…
        </div>
      </SiteLayout>
    );
  }

  if (admin.data && !admin.data.isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-28">
          <h1 className="text-2xl font-semibold">Sem permissão</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Esta conta não tem acesso à administração do portfólio.
          </p>
          <button
            type="button"
            onClick={sair}
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto w-full max-w-4xl px-5 py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold md:text-3xl">Administração</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Edite o conteúdo do site e salve. As páginas públicas atualizam na hora.
            </p>
          </div>
          <button
            type="button"
            onClick={sair}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
          {abas.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAba(a.id)}
              className={`rounded-md px-3.5 py-2 text-sm transition-colors ${
                aba === a.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6">
          {aba === "perfil" && <AbaPerfil c={c} set={set} />}
          {aba === "projetos" && <AbaProjetos c={c} set={set} />}
          {aba === "curriculo" && (
            <AbaCurriculo c={c} set={set} onEnviarPdf={enviarCurriculo} />
          )}
          {aba === "blog" && <AbaBlog c={c} set={set} />}
          {aba === "depoimentos" && <AbaDepoimentos c={c} set={set} />}
        </div>

        <div className="sticky bottom-4 mt-10 flex items-center gap-3 rounded-lg border border-border bg-card/95 p-4 backdrop-blur">
          <button
            type="button"
            onClick={() =>
              salvar([
                "perfil",
                "competencias",
                "projetos",
                "experiencias",
                "formacao",
                "certificacoes",
                "formacaoComplementar",
                "tecnologias",
                "depoimentos",
                "posts",
              ])
            }
            disabled={estado === "salvando"}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {estado === "salvando" ? "Salvando…" : "Salvar alterações"}
          </button>
          {estado === "salvo" && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Check className="h-4 w-4" /> Tudo salvo
            </span>
          )}
          {estado === "erro" && (
            <span className="text-sm text-destructive">
              Não foi possível salvar. Tente de novo.
            </span>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

type Props = {
  c: SiteContent;
  set: <K extends keyof SiteContent>(chave: K, valor: SiteContent[K]) => void;
};

function AbaPerfil({ c, set }: Props) {
  const p = c.perfil;
  const up = (campos: Partial<SiteContent["perfil"]>) => set("perfil", { ...p, ...campos });

  return (
    <>
      <div className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2">
        <Campo label="Nome" valor={p.nome} onChange={(v) => up({ nome: v })} />
        <Campo label="Cidade" valor={p.cidade} onChange={(v) => up({ cidade: v })} />
        <Campo label="Cargo / título" valor={p.cargo} onChange={(v) => up({ cargo: v })} />
        <Campo label="E-mail" valor={p.email} onChange={(v) => up({ email: v })} />
        <Campo label="Telefone" valor={p.telefone} onChange={(v) => up({ telefone: v })} />
        <Campo
          label="Telefone (só números, com DDI)"
          valor={p.telefoneLink}
          onChange={(v) => up({ telefoneLink: v })}
        />
        <Campo label="LinkedIn (URL)" valor={p.linkedin} onChange={(v) => up({ linkedin: v })} />
        <Campo
          label="LinkedIn (texto exibido)"
          valor={p.linkedinLabel}
          onChange={(v) => up({ linkedinLabel: v })}
        />
      </div>

      <div className="grid gap-4 rounded-lg border border-border bg-card p-5">
        <Area
          label="Resumo curto (home)"
          valor={p.resumoCurto}
          onChange={(v) => up({ resumoCurto: v })}
        />
        <ListaTexto
          label="Perfil profissional (página Sobre)"
          itens={p.perfilProfissional}
          linhas={8}
          onChange={(v) => up({ perfilProfissional: v })}
        />
        <Area label="Objetivo" valor={p.objetivo} onChange={(v) => up({ objetivo: v })} />
      </div>

      <div className="grid gap-4 rounded-lg border border-border bg-card p-5">
        <span className="text-sm font-semibold">Números de destaque</span>
        {p.destaques.map((d, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-[140px_1fr]">
            <Campo
              label="Valor"
              valor={d.valor}
              onChange={(v) =>
                up({
                  destaques: p.destaques.map((x, j) => (j === i ? { ...x, valor: v } : x)),
                })
              }
            />
            <Campo
              label="Descrição"
              valor={d.rotulo}
              onChange={(v) =>
                up({
                  destaques: p.destaques.map((x, j) => (j === i ? { ...x, rotulo: v } : x)),
                })
              }
            />
          </div>
        ))}
      </div>

      <GruposEditor
        titulo="Competências (página Sobre)"
        grupos={c.competencias}
        onChange={(v) => set("competencias", v)}
      />
    </>
  );
}

function GruposEditor({
  titulo,
  grupos,
  onChange,
}: {
  titulo: string;
  grupos: Grupo[];
  onChange: (v: Grupo[]) => void;
}) {
  return (
    <div className="grid gap-4">
      <span className="text-sm font-semibold">{titulo}</span>
      {grupos.map((g, i) => (
        <Cartao
          key={i}
          titulo={g.grupo}
          indice={i}
          total={grupos.length}
          onMover={(de, para) => onChange(mover(grupos, de, para))}
          onRemover={(idx) => onChange(grupos.filter((_, j) => j !== idx))}
        >
          <Campo
            label="Grupo"
            valor={g.grupo}
            onChange={(v) => onChange(grupos.map((x, j) => (j === i ? { ...x, grupo: v } : x)))}
          />
          <ListaTexto
            label="Itens"
            itens={g.itens}
            onChange={(v) => onChange(grupos.map((x, j) => (j === i ? { ...x, itens: v } : x)))}
          />
        </Cartao>
      ))}
      <BotaoAdicionar
        texto="Adicionar grupo"
        onClick={() => onChange([...grupos, { grupo: "Novo grupo", itens: [] }])}
      />
    </div>
  );
}

function AbaProjetos({ c, set }: Props) {
  const lista = c.projetos;
  const up = (i: number, campos: Partial<Projeto>) =>
    set(
      "projetos",
      lista.map((x, j) => (j === i ? { ...x, ...campos } : x)),
    );

  return (
    <div className="grid gap-4">
      {lista.map((p, i) => (
        <Cartao
          key={i}
          titulo={p.titulo}
          indice={i}
          total={lista.length}
          onMover={(de, para) => set("projetos", mover(lista, de, para))}
          onRemover={(idx) =>
            set(
              "projetos",
              lista.filter((_, j) => j !== idx),
            )
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Título" valor={p.titulo} onChange={(v) => up(i, { titulo: v })} />
            <Campo
              label="Endereço na web (slug)"
              valor={p.slug}
              onChange={(v) => up(i, { slug: v })}
            />
            <Campo label="Cliente" valor={p.cliente} onChange={(v) => up(i, { cliente: v })} />
            <Campo label="Ano" valor={p.ano} onChange={(v) => up(i, { ano: v })} />
            <Campo
              label="Plataforma"
              valor={p.plataforma}
              onChange={(v) => up(i, { plataforma: v as Projeto["plataforma"] })}
            />
            <Campo label="Link (opcional)" valor={p.link ?? ""} onChange={(v) => up(i, { link: v })} />
          </div>
          <Area label="Resumo" valor={p.resumo} onChange={(v) => up(i, { resumo: v })} />
          <Area label="O desafio" valor={p.desafio} onChange={(v) => up(i, { desafio: v })} />
          <ListaTexto label="A solução" itens={p.solucao} linhas={6} onChange={(v) => up(i, { solucao: v })} />
          <ListaTexto label="Integrações" itens={p.integracoes} onChange={(v) => up(i, { integracoes: v })} />
          <ListaTexto label="Resultados" itens={p.resultados} onChange={(v) => up(i, { resultados: v })} />
          <Area
            label="Métricas"
            linhas={3}
            ajuda="Uma por linha, no formato: valor | descrição"
            valor={(p.metricas ?? []).map((m) => `${m.valor} | ${m.rotulo}`).join("\n")}
            onChange={(v) =>
              up(i, {
                metricas: v
                  .split("\n")
                  .map((l) => l.split("|"))
                  .filter((partes) => partes[0]?.trim())
                  .map((partes) => ({
                    valor: (partes[0] ?? "").trim(),
                    rotulo: (partes[1] ?? "").trim(),
                  })),
              })
            }
          />
          <ListaTexto label="Tags" itens={p.tags} linhas={3} onChange={(v) => up(i, { tags: v })} />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={Boolean(p.exemplo)}
              onChange={(e) => up(i, { exemplo: e.target.checked })}
            />
            Marcar como case representativo (exemplo)
          </label>
        </Cartao>
      ))}
      <BotaoAdicionar
        texto="Adicionar projeto"
        onClick={() =>
          set("projetos", [
            ...lista,
            {
              slug: `novo-projeto-${lista.length + 1}`,
              titulo: "Novo projeto",
              cliente: "",
              plataforma: "VTEX",
              ano: String(new Date().getFullYear()),
              resumo: "",
              desafio: "",
              solucao: [],
              integracoes: [],
              resultados: [],
              metricas: [],
              tags: [],
              exemplo: false,
            },
          ])
        }
      />
    </div>
  );
}

function AbaCurriculo({ c, set, onEnviarPdf }: Props & { onEnviarPdf: (f: File) => void }) {
  const lista = c.experiencias;
  const up = (i: number, campos: Partial<Experiencia>) =>
    set(
      "experiencias",
      lista.map((x, j) => (j === i ? { ...x, ...campos } : x)),
    );

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-border bg-card p-5">
        <span className="text-sm font-semibold">PDF do currículo</span>
        <p className="mt-2 text-sm text-muted-foreground">
          {c.curriculoPath
            ? "Um PDF enviado por você está publicado no site."
            : "O site usa o PDF original. Envie um novo para substituí-lo."}
        </p>
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm">
          <Upload className="h-4 w-4" /> Enviar novo PDF
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onEnviarPdf(f);
            }}
          />
        </label>
      </div>

      <div className="grid gap-4">
        <span className="text-sm font-semibold">Experiência profissional</span>
        {lista.map((x, i) => (
          <Cartao
            key={i}
            titulo={`${x.cargo} — ${x.empresa}`}
            indice={i}
            total={lista.length}
            onMover={(de, para) => set("experiencias", mover(lista, de, para))}
            onRemover={(idx) =>
              set(
                "experiencias",
                lista.filter((_, j) => j !== idx),
              )
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Campo label="Empresa" valor={x.empresa} onChange={(v) => up(i, { empresa: v })} />
              <Campo label="Cargo" valor={x.cargo} onChange={(v) => up(i, { cargo: v })} />
              <Campo label="Período" valor={x.periodo} onChange={(v) => up(i, { periodo: v })} />
              <Campo label="Local" valor={x.local} onChange={(v) => up(i, { local: v })} />
            </div>
            <Area label="Descrição" valor={x.descricao} onChange={(v) => up(i, { descricao: v })} />
            <ListaTexto
              label="Atividades"
              itens={x.itens}
              linhas={8}
              onChange={(v) => up(i, { itens: v })}
            />
          </Cartao>
        ))}
        <BotaoAdicionar
          texto="Adicionar experiência"
          onClick={() =>
            set("experiencias", [
              ...lista,
              { empresa: "", cargo: "", periodo: "", local: "", descricao: "", itens: [] },
            ])
          }
        />
      </div>

      <div className="grid gap-4 rounded-lg border border-border bg-card p-5">
        <ListaTexto
          label="Certificações"
          itens={c.certificacoes}
          onChange={(v) => set("certificacoes", v)}
        />
        <ListaTexto
          label="Formação complementar"
          itens={c.formacaoComplementar}
          onChange={(v) => set("formacaoComplementar", v)}
        />
        <Area
          label="Formação acadêmica"
          linhas={3}
          ajuda="Uma por linha, no formato: curso | instituição"
          valor={c.formacao.map((f) => `${f.curso} | ${f.instituicao}`).join("\n")}
          onChange={(v) =>
            set(
              "formacao",
              v
                .split("\n")
                .map((l) => l.split("|"))
                .filter((partes) => partes[0]?.trim())
                .map((partes) => ({
                  curso: (partes[0] ?? "").trim(),
                  instituicao: (partes[1] ?? "").trim(),
                })),
            )
          }
        />
      </div>

      <GruposEditor
        titulo="Tecnologias e plataformas"
        grupos={c.tecnologias}
        onChange={(v) => set("tecnologias", v)}
      />
    </div>
  );
}

function AbaBlog({ c, set }: Props) {
  const lista = c.posts;
  const up = (i: number, campos: Partial<Post>) =>
    set(
      "posts",
      lista.map((x, j) => (j === i ? { ...x, ...campos } : x)),
    );

  return (
    <div className="grid gap-4">
      {lista.map((p, i) => (
        <Cartao
          key={i}
          titulo={p.titulo}
          indice={i}
          total={lista.length}
          onMover={(de, para) => set("posts", mover(lista, de, para))}
          onRemover={(idx) =>
            set(
              "posts",
              lista.filter((_, j) => j !== idx),
            )
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Título" valor={p.titulo} onChange={(v) => up(i, { titulo: v })} />
            <Campo
              label="Endereço na web (slug)"
              valor={p.slug}
              onChange={(v) => up(i, { slug: v })}
            />
            <Campo
              label="Data (AAAA-MM-DD)"
              valor={p.data}
              onChange={(v) => up(i, { data: v })}
            />
          </div>
          <Area label="Resumo" valor={p.resumo} onChange={(v) => up(i, { resumo: v })} />
          <ListaTexto label="Tags" itens={p.tags} linhas={3} onChange={(v) => up(i, { tags: v })} />
          <ListaTexto
            label="Conteúdo"
            itens={p.conteudo}
            linhas={12}
            onChange={(v) => up(i, { conteudo: v })}
          />
          <p className="text-xs text-muted-foreground">
            Cada linha é um parágrafo. Comece a linha com “## ” para criar um subtítulo.
          </p>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={Boolean(p.exemplo)}
              onChange={(e) => up(i, { exemplo: e.target.checked })}
            />
            Marcar como artigo de exemplo
          </label>
        </Cartao>
      ))}
      <BotaoAdicionar
        texto="Adicionar artigo"
        onClick={() =>
          set("posts", [
            {
              slug: `novo-artigo-${lista.length + 1}`,
              titulo: "Novo artigo",
              data: new Date().toISOString().slice(0, 10),
              resumo: "",
              tags: [],
              conteudo: [],
              exemplo: false,
            },
            ...lista,
          ])
        }
      />
    </div>
  );
}

function AbaDepoimentos({ c, set }: Props) {
  const lista = c.depoimentos;
  const up = (i: number, campos: Partial<Depoimento>) =>
    set(
      "depoimentos",
      lista.map((x, j) => (j === i ? { ...x, ...campos } : x)),
    );

  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted-foreground">
        A seção só aparece no site quando houver ao menos um depoimento. Publique apenas textos
        autorizados por quem os escreveu.
      </p>
      {lista.map((d, i) => (
        <Cartao
          key={i}
          titulo={d.autor}
          indice={i}
          total={lista.length}
          onMover={(de, para) => set("depoimentos", mover(lista, de, para))}
          onRemover={(idx) =>
            set(
              "depoimentos",
              lista.filter((_, j) => j !== idx),
            )
          }
        >
          <Area label="Depoimento" valor={d.texto} onChange={(v) => up(i, { texto: v })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Campo label="Autor" valor={d.autor} onChange={(v) => up(i, { autor: v })} />
            <Campo label="Cargo / empresa" valor={d.cargo} onChange={(v) => up(i, { cargo: v })} />
          </div>
        </Cartao>
      ))}
      <BotaoAdicionar
        texto="Adicionar depoimento"
        onClick={() => set("depoimentos", [...lista, { texto: "", autor: "", cargo: "" }])}
      />
    </div>
  );
}
