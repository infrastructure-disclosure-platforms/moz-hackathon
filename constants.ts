import { DaySchedule, Translation, Challenge } from './types';
import { Database, WifiOff, Users, AlertCircle, FileText, Code2 } from 'lucide-react';

export const TRANSLATIONS: Record<string, Translation> = {
  pt: {
    heroTitle: "HackaTransparency Moçambique 2025",
    heroSubtitle: "Participação Cidadã como Pilar do Desenvolvimento de Infra-estruturas",
    location: "ISUTC, Sala 101, Edifício E • 25–27 Novembro",
    ctaRegister: "Registar Agora",
    ctaDocs: "Ver Documentação",
    navAgenda: "Agenda",
    navChallenges: "Desafios",
    navData: "Dados & API",
    navPrizes: "Prémios",
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
  },
  en: {
    heroTitle: "HackaTransparency Mozambique 2025",
    heroSubtitle: "Citizen Participation as a Pillar of Infrastructure Development",
    location: "ISUTC, Room 101, Building E • November 25–27",
    ctaRegister: "Register Now",
    ctaDocs: "View Documentation",
    navAgenda: "Schedule",
    navChallenges: "Challenges",
    navData: "Data & API",
    navPrizes: "Prizes",
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