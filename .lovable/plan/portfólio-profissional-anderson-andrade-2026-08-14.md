# Portfólio Profissional — Anderson Andrade

Site de portfólio em português, focado em projetos de implantação de e-commerce, com todo o conteúdo centralizado num único arquivo de dados fácil de editar (sem login, sem banco).

## Páginas

- **Início (/)** — apresentação: nome, cargo ("Especialista em Implantação e Projetos Digitais | E-commerce | Integrações | VTEX"), resumo do perfil, números de destaque (10+ anos, 100+ projetos, 5+ anos em e-commerce), botões para Projetos, Currículo e contato.
- **Sobre (/sobre)** — perfil profissional completo, competências-chave agrupadas (Implantação & Projetos, E-commerce, Integrações, Qualidade, Tecnologia & Dados, Inovação) e objetivo profissional.
- **Projetos (/projetos)** — grade de cards de cases: cliente/projeto, plataforma (VTEX, Nuvemshop, Shopify), escopo, integrações e resultado. Filtro por plataforma.
- **Detalhe do projeto (/projetos/$slug)** — estudo de caso: contexto, desafio, solução/etapas conduzidas, integrações, resultados e tecnologias.
- **Currículo (/curriculo)** — linha do tempo de experiências (Agência E-Plus, Lemare Móveis, ITBroker, IT2B), formação (FATEC), certificações (VTEX Implementation B2C, Google Project Management, Scrum SFC), formação complementar em gestão de projetos, tecnologias e plataformas, e botão para baixar o PDF do currículo.
- **Contato (/contato)** — telefone, e-mail e LinkedIn com links diretos (tel:, mailto:), sem backend.

## Como editar o conteúdo

Todo o texto vive em `src/data/portfolio.ts`:

- `perfil` — nome, cargo, cidade, telefone, e-mail, LinkedIn, resumo, destaques numéricos.
- `competencias` — lista de grupos com itens.
- `projetos` — array de objetos (slug, título, cliente, plataforma, ano, resumo, desafio, solução em passos, integrações, resultados, tags). Adicionar um novo projeto = copiar um objeto e trocar os campos; a página de detalhe é gerada automaticamente.
- `experiencias`, `formacao`, `certificacoes`, `tecnologias` — listas simples.

Cada bloco terá comentários explicando o que editar. Nada quebra se um campo opcional ficar vazio.

## Projetos iniciais

Como o currículo não traz nomes de clientes, entrego 4 cases representativos e claramente rotulados como exemplos (implantação VTEX B2C, migração para Nuvemshop, integração ERP + marketplaces, rollout/otimização de checkout e tracking com GA4/GTM), prontos para você substituir pelos reais.

## Design

Direção sóbria e corporativa-tech: fundo escuro profundo com azul-elétrico de destaque, tipografia geométrica para títulos e sans neutra para texto, cards com bordas finas e microanimações discretas ao rolar. Tokens semânticos em `src/styles.css` (nada de cores fixas nos componentes).

## Detalhes técnicos

- Rotas TanStack Router: `index.tsx`, `sobre.tsx`, `projetos.index.tsx`, `projetos.$slug.tsx`, `curriculo.tsx`, `contato.tsx`; cada uma com `head()` própria (title, description, og).
- Cabeçalho e rodapé compartilhados em `__root.tsx`, com navegação e menu responsivo.
- PDF do currículo publicado como asset e ligado ao botão de download.
- Rota de projeto inexistente → `notFound()` com página amigável.
