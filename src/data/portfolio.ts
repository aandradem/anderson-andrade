/**
 * ============================================================
 *  CONTEÚDO DO PORTFÓLIO — edite apenas este arquivo
 * ============================================================
 *  Tudo o que aparece no site vem daqui. Altere textos, adicione
 *  ou remova itens das listas. O site se atualiza sozinho.
 */

/** Dados pessoais e resumo exibidos na home, no rodapé e no contato. */
export const perfil = {
  nome: "Anderson Andrade",
  cargo:
    "Especialista em Implantação e Projetos Digitais | E-commerce | Integrações | VTEX",
  cidade: "São Paulo – SP",
  telefone: "+55 (11) 99971-9912",
  telefoneLink: "+5511999719912",
  email: "aandersonandradem@gmail.com",
  linkedin: "https://linkedin.com/in/antonio-anderson-andrade/",
  linkedinLabel: "linkedin.com/in/antonio-anderson-andrade",
  resumoCurto:
    "Conduzo projetos de e-commerce de ponta a ponta — do levantamento de requisitos ao go-live e à sustentação — conectando negócio, tecnologia e equipes multidisciplinares.",
  /** Números de destaque na home. */
  destaques: [
    { valor: "10+", rotulo: "anos em tecnologia e operações digitais" },
    { valor: "100", rotulo: "projetos de e-commerce conduzidos" },
    { valor: "5+", rotulo: "anos dedicados a implantação de e-commerce" },
  ],
  /** Parágrafos do perfil profissional (página Sobre). */
  perfilProfissional: [
    "Especialista em implantação de e-commerce e gestão de projetos digitais, com mais de 10 anos de experiência em tecnologia e operações digitais e mais de 5 anos atuando diretamente na implantação e evolução de plataformas de e-commerce.",
    "Experiência na condução de projetos de ponta a ponta, envolvendo levantamento de requisitos, planejamento, parametrização, integrações, homologação, testes, go-live e sustentação.",
    "Atuação como elo entre negócio, tecnologia, clientes e equipes multidisciplinares, traduzindo necessidades de negócio em requisitos e soluções técnicas, acompanhando cronogramas, riscos, prioridades e qualidade das entregas.",
    "Experiência prática com VTEX, Nuvemshop e Shopify, além de integrações com ERPs, marketplaces, gateways de pagamento, logística e APIs.",
    "Perfil analítico, organizado e orientado à resolução de problemas, combinando visão de negócio, conhecimento técnico e metodologias de gestão. Também atuo com QA/UAT, UX/UI, Google Analytics, Google Tag Manager, automação de processos e aplicação de Inteligência Artificial para produtividade e melhoria operacional.",
  ],
  objetivo:
    "Atuar como Especialista de Implantação, Analista de Projetos, Analista de Implantação ou Project Manager, contribuindo para a implantação e evolução de produtos e soluções digitais, integração de sistemas e melhoria de processos. Busco aplicar minha experiência em e-commerce, gestão de projetos, integrações e tecnologia, conectando visão de negócio e conhecimento técnico para gerar entregas eficientes, escaláveis e orientadas a resultados.",
};

/** Competências-chave (página Sobre). Adicione ou remova grupos livremente. */
export const competencias = [
  {
    grupo: "Implantação & Projetos",
    itens: [
      "Gestão de projetos digitais",
      "Implantação de e-commerce",
      "Migração e rollout",
      "Levantamento de requisitos",
      "Planejamento e cronogramas",
      "Gestão de escopo",
      "Gestão de stakeholders",
      "Status reports",
      "Go-live",
    ],
  },
  {
    grupo: "E-commerce",
    itens: [
      "VTEX",
      "Nuvemshop",
      "Shopify",
      "Parametrização",
      "Jornada de compra",
      "UX/UI",
      "CRO",
    ],
  },
  {
    grupo: "Integrações",
    itens: [
      "APIs",
      "ERP",
      "Marketplaces",
      "Hubs",
      "Gateways de pagamento",
      "Logística",
      "Meios de envio",
    ],
  },
  {
    grupo: "Qualidade",
    itens: [
      "QA",
      "UAT",
      "Homologação",
      "Testes funcionais",
      "Validação de requisitos",
      "Análise de bugs",
      "Melhoria contínua",
    ],
  },
  {
    grupo: "Tecnologia & Dados",
    itens: ["HTML", "CSS", "DNS", "Google Analytics", "Google Tag Manager"],
  },
  {
    grupo: "Inovação",
    itens: [
      "Inteligência Artificial",
      "Automação de processos",
      "Otimização operacional",
    ],
  },
];

export type Projeto = {
  /** Usado na URL: /projetos/<slug>. Use letras minúsculas e hifens. */
  slug: string;
  titulo: string;
  cliente: string;
  plataforma: "VTEX" | "Nuvemshop" | "Shopify" | "Multiplataforma";
  ano: string;
  /** Resumo curto exibido no card. */
  resumo: string;
  desafio: string;
  /** Etapas conduzidas — vira a lista numerada da página do projeto. */
  solucao: string[];
  integracoes: string[];
  resultados: string[];
  /** Métricas de impacto exibidas em destaque no card e na página do case. */
  metricas?: { valor: string; rotulo: string }[];
  tags: string[];
  /** Opcional: link externo para a loja/case. */
  link?: string;
  /** Marque como false quando substituir por um case real. */
  exemplo?: boolean;
};

/**
 * PROJETOS
 * Para adicionar um novo: copie um bloco { ... } inteiro, cole no final da
 * lista e troque os campos. A página de detalhe é criada automaticamente.
 * Os cases abaixo são representativos — substitua pelos projetos reais.
 */
export const projetos: Projeto[] = [
  {
    slug: "implantacao-vtex-b2c",
    titulo: "Implantação VTEX B2C de ponta a ponta",
    cliente: "Varejo de moda (case representativo)",
    plataforma: "VTEX",
    ano: "2024",
    resumo:
      "Condução completa da implantação de uma loja VTEX B2C: requisitos, parametrização, integrações, homologação e go-live assistido.",
    desafio:
      "Cliente sem operação digital estruturada precisava lançar a loja em prazo curto, com catálogo extenso, múltiplas formas de pagamento e integração com o ERP já existente.",
    solucao: [
      "Levantamento e validação de requisitos funcionais e técnicos com áreas de negócio, TI e logística.",
      "Planejamento do projeto com cronograma, marcos, dependências e matriz de responsabilidades.",
      "Parametrização da plataforma: políticas comerciais, catálogo, promoções, fretes e checkout.",
      "Coordenação das frentes de desenvolvimento, design e mídia até a entrega da vitrine.",
      "Homologação, testes funcionais e UAT com roteiros por jornada de compra.",
      "Go-live assistido, monitoramento de pedidos e sustentação nas primeiras semanas.",
    ],
    integracoes: [
      "ERP (produtos, estoque, preços e pedidos)",
      "Gateway de pagamento e antifraude",
      "Transportadoras e cálculo de frete",
      "Google Analytics e Google Tag Manager",
    ],
    resultados: [
      "Go-live dentro do prazo de 4 meses, sem impacto nas vendas durante a transição.",
      "Catálogo e estoque sincronizados automaticamente com o ERP em poucos minutos.",
      "Rotas de frete estabilizadas logo na primeira semana de operação.",
      "Aumento de 18% na velocidade de carregamento das páginas no primeiro mês.",
    ],
    metricas: [
      { valor: "4 meses", rotulo: "do kick-off ao go-live" },
      { valor: "+18%", rotulo: "velocidade de carregamento" },
      { valor: "0", rotulo: "dias de venda perdidos" },
    ],
    tags: ["Implantação", "VTEX", "Go-live", "UAT"],
    exemplo: true,
  },
  {
    slug: "migracao-nuvemshop",
    titulo: "Migração de plataforma para Nuvemshop",
    cliente: "Marca D2C (case representativo)",
    plataforma: "Nuvemshop",
    ano: "2023",
    resumo:
      "Migração de loja legada para Nuvemshop com preservação de SEO, redirecionamentos e continuidade da operação.",
    desafio:
      "A plataforma anterior limitava promoções e integrações. A migração precisava acontecer sem perda de tráfego orgânico nem interrupção das vendas.",
    solucao: [
      "Mapeamento do catálogo, URLs, clientes e histórico de pedidos.",
      "Plano de migração por etapas com janela de corte definida.",
      "Configuração de redirecionamentos 301 e revisão de SEO on-page.",
      "Reconfiguração de meios de pagamento, fretes e regras promocionais.",
      "Testes de jornada completa e validação de tracking antes do apontamento de DNS.",
      "Apontamento de DNS, monitoramento pós-corte e ajustes finos.",
    ],
    integracoes: [
      "ERP e emissão fiscal",
      "Meios de envio e etiquetas",
      "Gateway de pagamento",
      "Ferramentas de e-mail marketing",
    ],
    resultados: [
      "Corte realizado sem indisponibilidade percebida pelos clientes.",
      "Tráfego orgânico preservado com plano de redirecionamentos 301.",
      "Operação com mais autonomia para campanhas e promoções.",
    ],
    metricas: [
      { valor: "100%", rotulo: "das URLs redirecionadas" },
      { valor: "< 1h", rotulo: "janela de corte" },
      { valor: "0", rotulo: "quedas de tráfego orgânico" },
    ],
    tags: ["Migração", "Nuvemshop", "SEO", "DNS"],
    exemplo: true,
  },
  {
    slug: "integracao-erp-marketplaces",
    titulo: "Integração ERP + marketplaces via hub",
    cliente: "Distribuidor multicanal (case representativo)",
    plataforma: "Multiplataforma",
    ano: "2023",
    resumo:
      "Unificação de estoque, preços e pedidos entre ERP, loja própria e marketplaces por meio de hub de integração e APIs.",
    desafio:
      "Estoque e preços divergentes entre canais geravam cancelamentos, retrabalho e atrasos no faturamento.",
    solucao: [
      "Mapeamento dos fluxos de dados por canal e definição da fonte de verdade.",
      "Especificação técnica das integrações e regras de conciliação.",
      "Configuração do hub, filas e tratamento de erros com os times técnicos.",
      "Homologação por cenários: venda, cancelamento, troca, ruptura e reprecificação.",
      "Documentação operacional e treinamento do time do cliente.",
    ],
    integracoes: [
      "ERP via API",
      "Hub de marketplaces",
      "Marketplaces (catálogo, estoque, preço e pedidos)",
      "Logística e rastreio",
    ],
    resultados: [
      "Estoque unificado entre os canais, reduzindo cancelamentos por ruptura.",
      "Pedidos integrados automaticamente ao ERP para faturamento.",
      "Menos trabalho manual na atualização de preços e catálogo.",
    ],
    metricas: [
      { valor: "5", rotulo: "canais integrados a um só ERP" },
      { valor: "-70%", rotulo: "cancelamentos por ruptura" },
      { valor: "min.", rotulo: "sincronismo de estoque e preço" },
    ],
    tags: ["Integrações", "APIs", "ERP", "Marketplaces"],
    exemplo: true,
  },
  {
    slug: "otimizacao-checkout-tracking",
    titulo: "Otimização de checkout e tracking GA4/GTM",
    cliente: "E-commerce em operação (case representativo)",
    plataforma: "VTEX",
    ano: "2025",
    resumo:
      "Diagnóstico da jornada de compra, correção de eventos de tracking e melhorias de conversão no funil final.",
    desafio:
      "Dados de funil inconsistentes impediam decisões de mídia e a etapa de pagamento concentrava abandono.",
    solucao: [
      "Auditoria da implementação de Google Tag Manager e eventos de e-commerce.",
      "Reimplementação da camada de dados e dos eventos do funil no GA4.",
      "Análise de abandono por etapa e priorização de melhorias de UX/UI.",
      "Testes funcionais e validação de dados em ambiente de homologação.",
      "Acompanhamento pós-publicação com relatórios de evolução.",
    ],
    integracoes: [
      "Google Tag Manager",
      "Google Analytics 4",
      "Gateway de pagamento",
    ],
    resultados: [
      "Funil de compra rastreado de forma consistente ponta a ponta.",
      "Fricções identificadas e corrigidas nas etapas finais do checkout.",
      "Base confiável de dados para decisões de mídia e CRO.",
    ],
    metricas: [
      { valor: "100%", rotulo: "eventos do funil validados" },
      { valor: "-1 etapa", rotulo: "no fluxo de pagamento" },
      { valor: "GA4", rotulo: "camada de dados reimplementada" },
    ],
    tags: ["CRO", "Analytics", "QA", "UX/UI"],
    exemplo: true,
  },
];

/** Experiência profissional (página Currículo). */
export const experiencias = [
  {
    empresa: "Agência E-Plus",
    cargo: "Analista de Implantação",
    periodo: "Janeiro/2021 – Agosto/2026",
    local: "São Paulo – SP",
    descricao:
      "Atuação na implantação, evolução e sustentação de projetos de e-commerce, conectando necessidades de negócio, requisitos técnicos e execução das equipes envolvidas.",
    itens: [
      "Condução de aproximadamente 100 projetos de e-commerce, do planejamento e levantamento de requisitos até homologação e entrada em produção.",
      "Análise e validação de requisitos funcionais e técnicos junto a clientes e stakeholders.",
      "Implantação e evolução de lojas virtuais em plataformas como VTEX e Nuvemshop.",
      "Parametrização e configuração de plataformas conforme necessidades comerciais e operacionais.",
      "Planejamento e acompanhamento de etapas, cronogramas, prioridades e entregas.",
      "Condução de reuniões de alinhamento com clientes, parceiros e equipes multidisciplinares.",
      "Interface entre clientes, Projetos, Desenvolvimento, Design, Mídia e Suporte.",
      "Configuração, acompanhamento e homologação de integrações com ERPs, marketplaces, gateways de pagamento, logística e APIs.",
      "Acompanhamento de problemas, dependências, riscos e pendências até a resolução.",
      "Elaboração de status reports e comunicação executiva sobre evolução, riscos e próximos passos.",
      "Planejamento e execução de homologações, testes funcionais e UAT.",
      "Apoio técnico em HTML/CSS, DNS, tags, Google Tag Manager e Google Analytics.",
      "Aplicação de automação e Inteligência Artificial para otimizar atividades, documentação e produtividade.",
    ],
  },
  {
    empresa: "Lemare Móveis",
    cargo: "Analista de E-commerce",
    periodo: "Junho/2018 – Agosto/2020",
    local: "São Paulo – SP",
    descricao: "Gestão operacional do e-commerce e suporte à jornada de compra.",
    itens: [
      "Cadastro, atualização e manutenção de produtos.",
      "Atendimento e suporte a clientes por chat, telefone e e-mail.",
      "Emissão de notas fiscais eletrônicas.",
      "Operação e integração com marketplaces.",
      "Apoio às atividades comerciais e operacionais da loja virtual.",
    ],
  },
  {
    empresa: "ITBroker Brasil",
    cargo: "Lead Development Representative Jr.",
    periodo: "Maio/2017 – Junho/2018",
    local: "São Paulo – SP",
    descricao: "Prospecção e qualificação de oportunidades de negócio.",
    itens: [
      "Prospecção e qualificação de potenciais clientes.",
      "Identificação de necessidades e oportunidades de negócio.",
      "Geração e qualificação de leads.",
      "Apoio ao processo comercial e relacionamento com prospects.",
    ],
  },
  {
    empresa: "IT2B – Tecnologia",
    cargo: "Analista de Suporte Técnico",
    periodo: "Fevereiro/2015 – Julho/2016",
    local: "São Paulo – SP",
    descricao: "Suporte técnico a usuários, estações de trabalho e infraestrutura.",
    itens: [
      "Instalação, configuração e manutenção de softwares e periféricos.",
      "Diagnóstico e resolução de incidentes.",
      "Suporte a redes e infraestrutura.",
      "Configuração e manutenção de servidores e estações.",
    ],
  },
];

/** Formação acadêmica. */
export const formacao = [
  {
    curso: "Tecnologia em Gestão da Tecnologia da Informação",
    instituicao: "FATEC São Paulo",
  },
];

/** Certificações. */
export const certificacoes = [
  "VTEX Implementation B2C",
  "Google Project Management",
  "Scrum Fundamentals Certified – SFC",
];

/** Formação complementar em gestão de projetos. */
export const formacaoComplementar = [
  "Foundations of Project Management",
  "Project Initiation: Starting a Successful Project",
  "Project Planning: Putting It All Together",
  "Project Execution: Running the Project",
];

/** Tecnologias e plataformas (página Currículo). */
export const tecnologias = [
  { grupo: "Plataformas de E-commerce", itens: ["VTEX", "Nuvemshop", "Shopify"] },
  {
    grupo: "Integrações",
    itens: ["APIs", "ERPs", "Marketplaces", "Hubs", "Gateways", "Logística"],
  },
  { grupo: "Analytics & Tracking", itens: ["Google Analytics", "Google Tag Manager"] },
  { grupo: "Web", itens: ["HTML", "CSS", "DNS"] },
  {
    grupo: "Gestão & Qualidade",
    itens: ["Scrum", "Gestão de Projetos", "Requisitos", "QA", "UAT", "Homologação"],
  },
  {
    grupo: "Tecnologias emergentes",
    itens: ["Inteligência Artificial", "Automação de processos"],
  },
];

/**
 * DEPOIMENTOS (prova social)
 * Substitua pelos nomes e cargos reais assim que tiver a autorização de cada pessoa.
 */
export type Depoimento = { texto: string; autor: string; cargo: string };

/**
 * DEPOIMENTOS
 * Vazio por padrão — a seção só aparece no site quando houver depoimentos reais.
 * Para incluir: adicione blocos { texto, autor, cargo } com nomes autorizados.
 */
export const depoimentos: Depoimento[] = [];

export type Post = {
  /** Usado na URL: /blog/<slug>. Letras minúsculas e hifens. */
  slug: string;
  titulo: string;
  /** Data no formato AAAA-MM-DD. */
  data: string;
  /** Resumo curto exibido na lista. */
  resumo: string;
  tags: string[];
  /** Cada item vira um parágrafo. Use "## Título" para criar subtítulos. */
  conteudo: string[];
  /** Marque como false quando for um artigo definitivo. */
  exemplo?: boolean;
};

/**
 * BLOG / ARTIGOS
 * Para publicar: copie um bloco { ... } inteiro, cole no início da lista e
 * troque os campos. A página do artigo é criada automaticamente.
 */
export const posts: Post[] = [
  {
    slug: "checklist-go-live-ecommerce",
    titulo: "Checklist de go-live de e-commerce: o que eu valido antes de virar a chave",
    data: "2026-08-20",
    resumo:
      "Os pontos que reviso em toda entrada em produção — catálogo, pagamento, frete, tracking e plano de contingência.",
    tags: ["Go-live", "Implantação", "QA"],
    conteudo: [
      "Todo go-live parece igual até o dia em que algo simples passa despercebido. Por isso trabalho sempre com o mesmo roteiro de validação, adaptado ao porte do projeto.",
      "## Catálogo e estoque",
      "Confirmo a sincronia entre ERP e plataforma, checo produtos sem imagem, sem preço ou sem estoque e valido as categorias que aparecem no menu.",
      "## Pagamento e frete",
      "Testo cada meio de pagamento com transações reais de baixo valor, valido o antifraude e simulo cálculo de frete para CEPs de regiões diferentes.",
      "## Tracking e analytics",
      "Nada de subir sem os eventos do funil validados. Sem dado confiável, a operação fica cega nas primeiras semanas, justamente quando as decisões são mais importantes.",
      "## Plano de contingência",
      "Defino antes quem aciona o quê, qual o critério de rollback e como a operação comunica clientes em caso de instabilidade.",
    ],
    exemplo: true,
  },
  {
    slug: "integracao-erp-sem-retrabalho",
    titulo: "Integração com ERP sem retrabalho: definindo a fonte de verdade",
    data: "2026-07-02",
    resumo:
      "A maioria dos problemas de integração não é técnica — é falta de acordo sobre quem manda em cada dado.",
    tags: ["Integrações", "ERP", "APIs"],
    conteudo: [
      "Quando estoque e preço divergem entre canais, o time costuma procurar o erro na API. Na prática, o problema quase sempre começa antes: ninguém definiu qual sistema é a fonte de verdade de cada informação.",
      "## Mapear antes de integrar",
      "Listo cada dado — produto, preço, estoque, pedido, status — e defino qual sistema cria, qual atualiza e qual apenas consome.",
      "## Combinar o tratamento de erro",
      "Fila, reprocessamento e alerta precisam estar desenhados antes do primeiro teste, senão a operação descobre a falha pelo cliente.",
      "## Homologar por cenário",
      "Venda, cancelamento, troca, ruptura e reprecificação. Cada um desses casos revela uma regra que não estava escrita em lugar nenhum.",
    ],
    exemplo: true,
  },
];
