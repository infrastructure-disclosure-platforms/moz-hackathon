import { DaySchedule, Translation, Challenge, DayPlaybook, Language, CodeExample } from './types';

export const TRANSLATIONS: Record<string, Translation> = {
  pt: {
    heroTitle: "HackaTransparency Moçambique 2025",
    heroSubtitle: "Participação Cidadã como Pilar do Desenvolvimento de Infra-estruturas",
    location: "ISUTC, Sala 101, Edifício E • 25–27 Novembro",
    ctaRegister: "Registar Agora",
    ctaDocs: "Ver Documentação",
    ctaAssurance: "Registo seguro, menos de 1 minuto.",
    scrollCue: "Role para ver o roteiro e próximos passos",
    progressLabel: "Progresso do evento",
    galleryAlfredReady: "Alfred Ready",
    galleryAnalyzing: "A analisar imagem...",
    galleryInsightTitle: "INSIGHT ALFRED",
    galleryAskAlfred: "Perguntar ao Alfred",
    navAgenda: "Agenda",
    navChallenges: "Desafios",
    navData: "Dados & API",
    navPrizes: "Prémios",
    navRoadmap: "Roteiro",
    navResources: "Recursos",
    sectionAbout: "Sobre o Evento",
    sectionChallenges: "Categorias",
    sectionAgenda: "Programa",
    sectionData: "Recursos para Developers",
    sectionPrizes: "Prémios e Júri",
    aboutText: "Uma iniciativa da CoST Moçambique para transformar dados de infra-estruturas em soluções digitais que promovam a transparência e o engajamento social.",
    prize1: "Tablet e Telemóvel (100.000 MT)",
    prize2: "Tablet (75.000 MT)",
    prize3: "Telemóvel (50.000 MT)",
    audienceChoice: "Escolha da Audiência",
    mainPortalTitle: "Portal Principal de Moçambique",
    mainPortalDesc: "Consulte informações de projectos, visualize detalhes de projectos de infra-estrutura e aceda ao painel de controlo completo.",
    datastoreTitle: "Datastore OC4IDS",
    datastoreDesc: "Dados OC4IDS de Moçambique e outros países publicadores. O datastore recolhe e armazena dados diariamente. Se os dados de um publicador falharem a validação do esquema OC4IDS ou não estiverem disponíveis, o datastore fornece acesso ao conjunto de dados válido mais recente.",
    visitPortal: "Visitar Portal",
    visitDatastore: "Visitar Datastore",
    oc4idsStandardTitle: "Documentação Oficial OC4IDS",
    oc4idsStandardDesc: "O OC4IDS (Open Contracting for Infrastructure Data Standard) é um padrão de dados abertos para publicar informações estruturadas sobre projectos de infra-estrutura. Esta documentação oficial fornece o esquema completo, guias de implementação, exemplos de dados e boas práticas para publicar dados de infra-estrutura de forma transparente e interoperável.",
    readDocumentation: "Ler Documentação",
    speaker: "Orador",
    locationVenue: "ISUTC, Sala 101",
    eventDates: "25–27 Nov",
    challengesSubtitle: "Três categorias distintas para transformar dados brutos em impacto cidadão.",
    prizeTablet: "Tablet",
    prizeSmartphone: "Telemóvel",
    prizeTabletPhone: "Tablet + Telemóvel",
    footerTagline: "Capacitar Moçambique através de dados abertos e inovação liderada por cidadãos em infra-estruturas.",
    footerContact: "Contacto",
    footerLegal: "Legal",
    footerTerms: "Termos de Participação",
    footerPrivacy: "Política de Privacidade",
    footerCode: "Código de Conduta",
    footerCopyright: "© 2025 CoST Moçambique. Todos os direitos reservados.",

    // Gallery
    galleryTitle: "Destaques do Dia 1",
    gallerySubtitle: "Capturando a energia, colaboração e inovação do primeiro dia.",
    galleryShuffle: "Misturar Memórias",
    galleryExplore: "Explore mais momentos do evento",
    galleryReAnalyze: "Re-analisar",

    // Code Playground
    sectionCodePlayground: "Playground de Código",
    codePlaygroundSubtitle: "Experimente a API em tempo real.",
    copyCode: "Copiar Código",
    copied: "Copiado!",
    runCode: "Executar",
    codeExamples: "Exemplos",
    askAI: "Perguntar ao Alfred",
    aiHelperPrompt: "Como posso ajudar com este código?",
  },
  en: {
    heroTitle: "HackaTransparency Mozambique 2025",
    heroSubtitle: "Citizen Participation as a Pillar of Infrastructure Development",
    location: "ISUTC, Room 101, Building E • November 25–27",
    ctaRegister: "Register Now",
    ctaDocs: "View Documentation",
    ctaAssurance: "Secure signup, under 1 minute.",
    scrollCue: "Scroll to see the roadmap and next steps",
    progressLabel: "Event progress",
    galleryAlfredReady: "Alfred Ready",
    galleryAnalyzing: "Analyzing Image...",
    galleryInsightTitle: "ALFRED INSIGHT",
    galleryAskAlfred: "Ask Alfred",
    navAgenda: "Schedule",
    navChallenges: "Challenges",
    navData: "Data & API",
    navPrizes: "Prizes",
    navRoadmap: "Roadmap",
    navResources: "Resources",
    sectionAbout: "About",
    sectionChallenges: "Categories",
    sectionAgenda: "Programme",
    sectionData: "Developer Resources",
    sectionPrizes: "Prizes & Jury",
    aboutText: "An initiative by CoST Mozambique to transform infrastructure data into digital solutions that promote transparency and social engagement.",
    prize1: "Tablet & Mobile Phone (100,000 MT)",
    prize2: "Tablet (75,000 MT)",
    prize3: "Mobile Phone (50,000 MT)",
    audienceChoice: "Audience Choice",
    mainPortalTitle: "Mozambique Main Portal",
    mainPortalDesc: "Get project information, view infrastructure project details, and access the complete dashboard.",
    datastoreTitle: "OC4IDS Datastore",
    datastoreDesc: "OC4IDS data from Mozambique and other publishing countries. The datastore fetches and stores data daily. If a publisher's data fails validation against the OC4IDS schema or is unavailable, the datastore provides access to the most recent valid dataset successfully fetched.",
    visitPortal: "Visit Portal",
    visitDatastore: "Visit Datastore",
    oc4idsStandardTitle: "Official OC4IDS Documentation",
    oc4idsStandardDesc: "OC4IDS (Open Contracting for Infrastructure Data Standard) is an open data standard for publishing structured information about infrastructure projects. This official documentation provides the complete schema, implementation guides, data examples, and best practices for publishing infrastructure data in a transparent and interoperable way.",
    readDocumentation: "Read Documentation",
    speaker: "Speaker",
    locationVenue: "ISUTC, Room 101",
    eventDates: "Nov 25–27",
    challengesSubtitle: "Three distinct tracks designed to transform raw data into citizen impact.",
    prizeTablet: "Tablet",
    prizeSmartphone: "Smartphone",
    prizeTabletPhone: "Tablet + Smartphone",
    footerTagline: "Empowering Mozambique through open data and citizen-led innovation in infrastructure.",
    footerContact: "Contact",
    footerLegal: "Legal",
    footerTerms: "Terms of Participation",
    footerPrivacy: "Privacy Policy",
    footerCode: "Code of Conduct",
    footerCopyright: "© 2025 CoST Mozambique. All rights reserved.",

    // Gallery
    galleryTitle: "Day One Highlights",
    gallerySubtitle: "Capturing the energy, collaboration, and innovation from the first day.",
    galleryShuffle: "Shuffle Memories",
    galleryExplore: "Explore more moments from the event",
    galleryReAnalyze: "Re-analyze",

    // Code Playground
    sectionCodePlayground: "Code Playground",
    codePlaygroundSubtitle: "Experiment with the API in real-time.",
    copyCode: "Copy Code",
    copied: "Copied!",
    runCode: "Run Code",
    codeExamples: "Examples",
    askAI: "Ask Alfred",
    aiHelperPrompt: "How can I help with this code?",
  }
};

export const CHALLENGES: Record<string, Challenge[]> = {
  pt: [
    {
      id: 1,
      title: "Tradutor de Responsabilidade",
      problem: "Cidadãos não conseguem interpretar anomalias de contratação nos dados brutos.",
      task: "Construir ferramentas que detectem sinais de alerta (desvios, atrasos) e expliquem em linguagem simples.",
      icon: "AlertCircle"
    },
    {
      id: 2,
      title: "Calculadora de Impacto Comunitário",
      problem: "Cidadãos não conseguem identificar projectos que os afectam localmente.",
      task: "Tornar dados abstractos em relevância local (ex: 'projectos a 5km de si').",
      icon: "Users"
    },
    {
      id: 3,
      title: "Acesso com Baixa Largura de Banda",
      problem: "Maioria dos cidadãos não tem internet fiável.",
      task: "Acessar dados via SMS, USSD, Bots de WhatsApp ou interfaces web ultra-leves.",
      icon: "WifiOff"
    }
  ],
  en: [
    {
      id: 1,
      title: "Accountability Translator",
      problem: "Citizens cannot interpret contracting anomalies in raw data.",
      task: "Build tools that detect warning signs (delays, cost overruns) and explain them in plain language.",
      icon: "AlertCircle"
    },
    {
      id: 2,
      title: "Community Impact Calculator",
      problem: "Citizens cannot identify projects that affect them locally.",
      task: "Make abstract data locally relevant (e.g., 'projects within 5km of you').",
      icon: "Users"
    },
    {
      id: 3,
      title: "Low Bandwidth Access",
      problem: "Most citizens do not have reliable internet.",
      task: "Access data via SMS, USSD, WhatsApp Bots, or ultra-light web interfaces.",
      icon: "WifiOff"
    }
  ]
};

export const AGENDA_DATA: Record<string, DaySchedule[]> = {
  pt: [
    {
      date: "25 Nov",
      title: "Dia 1: Lançamento e Primeiros Sprints",
      items: [
        { time: "08:00", title: "Registo + Abertura", duration: "30 min", type: "general" },
        { time: "08:30", title: "Notas de Boas-vindas & Apresentação CoST", duration: "45 min", type: "general" },
        { time: "09:25", title: "Apresentação da Plataforma", duration: "20 min", responsible: "David Gege", type: "general" },
        { time: "10:15", title: "Workshop de Dados OC4IDS", duration: "60 min", description: "Estrutura de campos, Acesso API, Demo", type: "general" },
        { time: "11:15", title: "Briefing dos Desafios", duration: "30 min", type: "general" },
        { time: "11:45", title: "Formação das Equipas", duration: "15 min", type: "general" },
        { time: "12:30", title: "Sprint 1: Arquitectura", duration: "90 min", type: "sprint" },
        { time: "13:30", title: "Sprint 2: Desenvolvimento de Funcionalidades", duration: "120 min", type: "sprint" },
        { time: "16:00", title: "Checkpoint do Dia 1", duration: "30 min", type: "general" }
      ]
    },
    {
      date: "26 Nov",
      title: "Dia 2: Build Sprint",
      items: [
        { time: "08:00", title: "Sincronização Matinal", duration: "15 min", type: "general" },
        { time: "08:15", title: "Sprint 3: Implementação Core", duration: "210 min", type: "sprint" },
        { time: "12:00", title: "Almoço de Trabalho", duration: "30 min", type: "break" },
        { time: "12:30", title: "Sprint 4: Finalização & Testes", duration: "180 min", type: "sprint" },
        { time: "15:30", title: "Checkpoint do Dia 2 + Briefing de Apresentação", duration: "30 min", type: "general" }
      ]
    },
    {
      date: "27 Nov",
      title: "Dia 3: Polimento e Apresentações",
      items: [
        { time: "08:30", title: "Sprint Final: Bug Fixes & Video Backup", duration: "60 min", type: "sprint" },
        { time: "09:30", title: "Code Freeze & Submissão", duration: "15 min", type: "general" },
        { time: "09:45", title: "Apresentações das Equipas", duration: "180 min", description: "10 min por equipa (5 demo + 5 Q&A)", type: "presentation" },
        { time: "13:25", title: "Cerimónia de Entrega de Prémios", duration: "35 min", type: "general" },
        { time: "14:15", title: "Encontro com Grupo Multissectorial", duration: "2h 45m", type: "general" }
      ]
    }
  ],
  en: [
    {
      date: "Nov 25",
      title: "Day 1: Launch & First Sprints",
      items: [
        { time: "08:00", title: "Registration + Opening", duration: "30 min", type: "general" },
        { time: "08:30", title: "Welcome Remarks & CoST Intro", duration: "45 min", type: "general" },
        { time: "09:25", title: "Platform Presentation", duration: "20 min", responsible: "David Gege", type: "general" },
        { time: "10:15", title: "OC4IDS Data Workshop", duration: "60 min", description: "Field Structure, API Access, Demo", type: "general" },
        { time: "11:15", title: "Challenge Briefing", duration: "30 min", type: "general" },
        { time: "11:45", title: "Team Formation", duration: "15 min", type: "general" },
        { time: "12:30", title: "Sprint 1: Architecture", duration: "90 min", type: "sprint" },
        { time: "13:30", title: "Sprint 2: Feature Development", duration: "120 min", type: "sprint" },
        { time: "16:00", title: "Day 1 Checkpoint", duration: "30 min", type: "general" }
      ]
    },
    {
      date: "Nov 26",
      title: "Day 2: Build Sprint",
      items: [
        { time: "08:00", title: "Morning Sync", duration: "15 min", type: "general" },
        { time: "08:15", title: "Sprint 3: Core Implementation", duration: "210 min", type: "sprint" },
        { time: "12:00", title: "Working Lunch", duration: "30 min", type: "break" },
        { time: "12:30", title: "Sprint 4: Completion & Testing", duration: "180 min", type: "sprint" },
        { time: "15:30", title: "Day 2 Checkpoint + Presentation Briefing", duration: "30 min", type: "general" }
      ]
    },
    {
      date: "Nov 27",
      title: "Day 3: Polishing & Presentations",
      items: [
        { time: "08:30", title: "Final Sprint: Fixes & Backup Video", duration: "60 min", type: "sprint" },
        { time: "09:30", title: "Code Freeze & Submission", duration: "15 min", type: "general" },
        { time: "09:45", title: "Team Presentations", duration: "180 min", description: "10 min per team (5 demo + 5 Q&A)", type: "presentation" },
        { time: "13:25", title: "Awards Ceremony", duration: "35 min", type: "general" },
        { time: "14:15", title: "Meeting with Multi-Stakeholder Group", duration: "2h 45m", type: "general" }
      ]
    }
  ]
};

export const DAY_PLAYBOOK: Record<Language, DayPlaybook> = {
  en: {
    ribbon: "Day 2: Build & Harden",
    heading: "Hackathon Roadmap",
    subheading: "Quick, visual guidance for each day.",
    dayLabel: "Day",
    autoLabel: "Auto",
    checklist: [
      { title: "By now", items: ["Team & track set", "Repo + API working", "Risks listed"] },
      { title: "Focus today", items: ["Ship core flow", "Handle errors/offline", "Proof: logs/screenshot"] },
      { title: "End of day", items: ["3-step demo path", "PT/EN copy on key screens", "Pitch outline ready"] }
    ],
    roadmap: [
      { title: "Day 1", items: ["Pick challenge", "Fetch OC4IDS sample", "Set roles/backlog"] },
      { title: "Day 2", items: ["Core loop with real data", "Offline/low-data fallback", "Save demo dataset"] },
      { title: "Day 3", items: ["Polish & rehearse", "2-min demo + Q&A", "Record backup video"] }
    ],
    support: {
      title: "Need help?",
      items: ["Data desk (11:00–12:00)", "Pitch corner (15:30)", "Ping orgs for blockers"]
    },
    quality: {
      title: "Quality bar",
      items: ["Works on weak Wi‑Fi", "Plain PT/EN insight", "Real data slice", "Clear citizen action"]
    },
    demo: {
      title: "Demo kit",
      items: ["60s story", "Live or 2-min video", "Impact slide", "What happens if you win"]
    },
    queries: [
      {
        title: "Status: implementation",
        description: "Neutral list for debugging.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?status=implementation&limit=10\""
      },
      {
        title: "Recent starts",
        description: "Projects starting in 2025.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?startDate=2025-01-01\""
      },
      {
        title: "Minimal fields",
        description: "Light payload for SMS/USSD.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?fields=id,title,status&limit=5\""
      }
    ],
    aiTitle: "AI assist (Gemini)",
    aiSubtitle: "Neutral prompts — adapt to your idea.",
    aiCta: "Open Gemini",
    aiTips: [
      "Generate dummy OC4IDS-like rows for testing",
      "Rewrite copy in PT/EN for clarity",
      "Summarize API fields into plain language",
      "Draft a 60s demo script"
    ]
  },
  pt: {
    ribbon: "Dia 2: Construir & Reforçar",
    heading: "Roteiro do Hackathon",
    subheading: "Guia rápido e visual para cada dia.",
    dayLabel: "Dia",
    autoLabel: "Auto",
    checklist: [
      { title: "Até agora", items: ["Equipa e trilha definidas", "Repo + API a funcionar", "Riscos listados"] },
      { title: "Foco de hoje", items: ["Entregar fluxo core", "Tratar erros/offline", "Prova: logs/screenshot"] },
      { title: "Fim do dia", items: ["Demo em 3 passos", "Copy PT/EN nos ecrãs chave", "Pitch rascunhado"] }
    ],
    roadmap: [
      { title: "Dia 1", items: ["Escolher desafio", "Buscar amostra OC4IDS", "Definir papéis/backlog"] },
      { title: "Dia 2", items: ["Fluxo core com dados reais", "Fallback offline/baixa banda", "Guardar dataset de demo"] },
      { title: "Dia 3", items: ["Polir e ensaiar", "Demo de 2 min + Q&A", "Gravar vídeo backup"] }
    ],
    support: {
      title: "Precisa de ajuda?",
      items: ["Balcão de dados (11:00–12:00)", "Cantinho de pitch (15:30)", "Fale com a org sobre bloqueios"]
    },
    quality: {
      title: "Barra de qualidade",
      items: ["Funciona com Wi‑Fi fraco", "Insight em PT/EN simples", "Dados reais", "Ação clara para cidadão"]
    },
    demo: {
      title: "Kit de demo",
      items: ["História de 60s", "Ao vivo ou vídeo de 2 min", "Slide de impacto", "O que acontece se ganharem"]
    },
    queries: [
      {
        title: "Estado: implementação",
        description: "Lista neutra para debug.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?status=implementation&limit=10\""
      },
      {
        title: "Inícios recentes",
        description: "Projetos a iniciar em 2025.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?startDate=2025-01-01\""
      },
      {
        title: "Campos mínimos",
        description: "Payload leve para SMS/USSD.",
        snippet: "curl \"https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?fields=id,title,status&limit=5\""
      }
    ],
    aiTitle: "Apoio IA (Gemini)",
    aiSubtitle: "Prompts neutros — adapte ao seu projeto.",
    aiCta: "Abrir Gemini",
    aiTips: [
      "Gerar linhas fictícias tipo OC4IDS para testes",
      "Reescrever copy em PT/EN com clareza",
      "Resumir campos da API em linguagem simples",
      "Esboçar um guião de demo de 60s"
    ]
  }
};

// ============================================================================
// CODE EXAMPLES (Interactive, Mobile-First)
// ============================================================================

export const CODE_EXAMPLES: Record<Language, CodeExample[]> = {
  en: [
    {
      id: 'fetch-all',
      title: 'Fetch All Projects',
      description: 'Basic API call',
      language: 'javascript',
      code: `fetch('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')
  .then(r => r.json())
  .then(data => console.log(data))`,
      tags: ['basic', 'API'],
      output: '[{id: "mz-001", title: "N1 Road"...}]',
    },
    {
      id: 'filter-date',
      title: 'Filter by Date',
      description: '2024-2026 projects',
      language: 'javascript',
      code: `const url = 'https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?startDate=2024-01-01&endDate=2026-12-31';
fetch(url).then(r => r.json())`,
      tags: ['filter', 'date'],
    },
    {
      id: 'group-status',
      title: 'Group by Status',
      description: 'Count projects by state',
      language: 'javascript',
      code: `const grouped = projects.reduce((acc, p) => {
  acc[p.status] = (acc[p.status] || 0) + 1;
  return acc;
}, {});`,
      tags: ['analysis', 'aggregation'],
    },
    {
      id: 'calc-distance',
      title: 'Calculate Distance',
      description: 'Km from user location',
      language: 'javascript',
      code: `function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}`,
      tags: ['geo', 'community'],
    },
    {
      id: 'detect-anomaly',
      title: 'Detect Cost Anomalies',
      description: 'Budget > 20% average',
      language: 'javascript',
      code: `const avg = projects.reduce((s,p) => s + p.budget, 0) / projects.length;
const anomalies = projects.filter(p => p.budget > avg * 1.2);`,
      tags: ['accountability', 'analysis'],
    },
    {
      id: 'python-fetch',
      title: 'Python Alternative',
      description: 'Same API, Python',
      language: 'python',
      code: `import requests
r = requests.get('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')
data = r.json()`,
      tags: ['python', 'basic'],
    },
  ],
  pt: [
    {
      id: 'fetch-all',
      title: 'Buscar Todos Projetos',
      description: 'Chamada API básica',
      language: 'javascript',
      code: `fetch('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')
  .then(r => r.json())
  .then(data => console.log(data))`,
      tags: ['básico', 'API'],
      output: '[{id: "mz-001", title: "Estrada N1"...}]',
    },
    {
      id: 'filter-date',
      title: 'Filtrar por Data',
      description: 'Projetos 2024-2026',
      language: 'javascript',
      code: `const url = 'https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData?startDate=2024-01-01&endDate=2026-12-31';
fetch(url).then(r => r.json())`,
      tags: ['filtro', 'data'],
    },
    {
      id: 'group-status',
      title: 'Agrupar por Estado',
      description: 'Contar projetos por estado',
      language: 'javascript',
      code: `const grouped = projects.reduce((acc, p) => {
  acc[p.status] = (acc[p.status] || 0) + 1;
  return acc;
}, {});`,
      tags: ['análise', 'agregação'],
    },
    {
      id: 'calc-distance',
      title: 'Calcular Distância',
      description: 'Km da localização do utilizador',
      language: 'javascript',
      code: `function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) ** 2 +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}`,
      tags: ['geo', 'comunidade'],
    },
    {
      id: 'detect-anomaly',
      title: 'Detectar Anomalias de Custo',
      description: 'Orçamento > 20% da média',
      language: 'javascript',
      code: `const avg = projects.reduce((s,p) => s + p.budget, 0) / projects.length;
const anomalies = projects.filter(p => p.budget > avg * 1.2);`,
      tags: ['responsabilidade', 'análise'],
    },
    {
      id: 'python-fetch',
      title: 'Alternativa Python',
      description: 'Mesma API, Python',
      language: 'python',
      code: `import requests
r = requests.get('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')
data = r.json()`,
      tags: ['python', 'básico'],
    },
  ],
};

// Fallback insights for Alfred AI when vision API fails
export const FALLBACK_INSIGHTS: Record<Language, { title: string; tags: string[]; quip: string }> = {
  pt: {
    title: "Momento HackaTransparency",
    tags: ["Colaboração", "Inovação", "Impacto"],
    quip: "Quando dados encontram propósito, comunidades ganham voz."
  },
  en: {
    title: "HackaTransparency Moment",
    tags: ["Collaboration", "Innovation", "Impact"],
    quip: "When data meets purpose, communities gain voice."
  }
};
