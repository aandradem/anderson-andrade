import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  perfil as perfilPadrao,
  competencias as competenciasPadrao,
  projetos as projetosPadrao,
  experiencias as experienciasPadrao,
  formacao as formacaoPadrao,
  certificacoes as certificacoesPadrao,
  formacaoComplementar as formacaoComplementarPadrao,
  tecnologias as tecnologiasPadrao,
  depoimentos as depoimentosPadrao,
  posts as postsPadrao,
  type Projeto,
  type Post,
  type Depoimento,
} from "@/data/portfolio";
import { getSiteContent } from "@/lib/site-content.functions";

export type Perfil = typeof perfilPadrao;
export type Grupo = { grupo: string; itens: string[] };
export type Experiencia = (typeof experienciasPadrao)[number];
export type Formacao = (typeof formacaoPadrao)[number];

export type SiteContent = {
  perfil: Perfil;
  competencias: Grupo[];
  projetos: Projeto[];
  experiencias: Experiencia[];
  formacao: Formacao[];
  certificacoes: string[];
  formacaoComplementar: string[];
  tecnologias: Grupo[];
  depoimentos: Depoimento[];
  posts: Post[];
  /** Caminho do PDF do currículo enviado pelo painel (dentro do armazenamento). */
  curriculoPath: string | null;
};

export const conteudoPadrao: SiteContent = {
  perfil: perfilPadrao,
  competencias: competenciasPadrao,
  projetos: projetosPadrao,
  experiencias: experienciasPadrao,
  formacao: formacaoPadrao,
  certificacoes: certificacoesPadrao,
  formacaoComplementar: formacaoComplementarPadrao,
  tecnologias: tecnologiasPadrao,
  depoimentos: depoimentosPadrao,
  posts: postsPadrao,
  curriculoPath: null,
};

export const secoes = Object.keys(conteudoPadrao) as (keyof SiteContent)[];

function mesclar(linhas: { key: string; value: unknown }[]): SiteContent {
  const salvo: Record<string, unknown> = {};
  for (const l of linhas) salvo[l.key] = l.value;
  const out = { ...conteudoPadrao } as Record<string, unknown>;
  for (const chave of secoes) {
    const v = salvo[chave];
    if (v !== undefined && v !== null) out[chave] = v;
  }
  if (typeof salvo["curriculoPath"] === "string") out["curriculoPath"] = salvo["curriculoPath"];
  return out as SiteContent;
}

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: async () => mesclar(await getSiteContent()),
  staleTime: 30_000,
});

export function useSiteContent(): SiteContent {
  return useSuspenseQuery(siteContentQuery).data;
}

/** Conteúdo sem suspender: usado em layout/rodapé, com queda para os dados padrão. */
export function useSiteContentSeguro(): SiteContent {
  const { data } = useQuery(siteContentQuery);
  return data ?? conteudoPadrao;
}

/** URL de download do currículo (PDF enviado pelo painel, se houver). */
export function urlCurriculo(conteudo: SiteContent, fallback: string) {
  return conteudo.curriculoPath ? "/api/public/curriculo" : fallback;
}
