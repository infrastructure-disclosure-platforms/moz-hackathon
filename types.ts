export type Language = 'pt' | 'en';

export interface AgendaItem {
  time: string;
  title: string;
  duration?: string;
  responsible?: string;
  description?: string;
  type: 'general' | 'break' | 'sprint' | 'presentation';
}

export interface DaySchedule {
  date: string;
  title: string;
  items: AgendaItem[];
}

export interface Challenge {
  id: number;
  title: string;
  problem: string;
  task: string;
  icon: string;
}

export interface DayChecklist {
  title: string;
  items: string[];
}

export interface SupportBlock {
  title: string;
  items: string[];
}

export interface QuickQuery {
  title: string;
  description: string;
  snippet: string;
}

export interface DemoKit {
  title: string;
  items: string[];
}

export interface DayPlaybook {
  ribbon: string;
  heading: string;
  subheading: string;
  dayLabel: string;
  autoLabel: string;
  checklist: DayChecklist[];
  roadmap: DayChecklist[];
  support: SupportBlock;
  quality: DayChecklist;
  demo: DemoKit;
  queries: QuickQuery[];
  aiTitle: string;
  aiSubtitle: string;
  aiCta: string;
  aiTips: string[];
}

// New: Code Examples for interactive playground
export interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: 'javascript' | 'python' | 'bash';
  code: string;
  tags: string[];
  output?: string; // Expected output preview
}

// Vision Analysis Response from Alfred AI
export interface VisionAnalysisResponse {
  title: string; // 5-50 characters
  tags: string[]; // Always 3 tags
  quip: string; // Max 25 words
}

export interface Translation {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  location: string;
  locationVenue: string;
  eventDates: string;
  ctaRegister: string;
  ctaDocs: string;

  // Navigation
  navAgenda: string;
  navChallenges: string;
  navData: string;
  navPrizes: string;
  navRoadmap: string;
  navResources: string;

  // Sections
  sectionAbout: string;
  sectionChallenges: string;
  sectionAgenda: string;
  sectionData: string;
  sectionPrizes: string;
  challengesSubtitle: string;

  // About/Portal
  aboutText: string;
  mainPortalTitle: string;
  mainPortalDesc: string;
  datastoreTitle: string;
  datastoreDesc: string;
  visitPortal: string;
  visitDatastore: string;

  // OC4IDS
  oc4idsStandardTitle: string;
  oc4idsStandardDesc: string;
  readDocumentation: string;

  // Code Playground (replacing FAQ)
  sectionCodePlayground: string;
  codePlaygroundSubtitle: string;
  copyCode: string;
  copied: string;
  runCode: string;
  codeExamples: string;
  askAI: string;
  aiHelperPrompt: string;

  // Microcopy / flow cues
  ctaAssurance: string;
  scrollCue: string;
  progressLabel: string;

  // Prizes
  prize1: string;
  prize2: string;
  prize3: string;
  audienceChoice: string;
  prizeTablet: string;
  prizeSmartphone: string;
  prizeTabletPhone: string;

  // Footer
  footerTagline: string;
  footerContact: string;
  footerLegal: string;
  footerTerms: string;
  footerPrivacy: string;
  footerCode: string;
  footerCopyright: string;

  // Gallery (uses "Alfred" - your AI assistant name)
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryShuffle?: string;
  galleryExplore?: string;
  galleryAlfredReady: string;
  galleryAnalyzing: string;
  galleryInsightTitle: string;
  galleryAskAlfred: string;
  galleryReAnalyze?: string;

  // Misc
  speaker: string;
}
