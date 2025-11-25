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

export interface Translation {
  heroTitle: string;
  heroSubtitle: string;
  location: string;
  ctaRegister: string;
  ctaDocs: string;
  navAgenda: string;
  navChallenges: string;
  navData: string;
  navPrizes: string;
  sectionAbout: string;
  sectionChallenges: string;
  sectionAgenda: string;
  sectionData: string;
  sectionPrizes: string;
  aboutText: string;
  prize1: string;
  prize2: string;
  prize3: string;
  audienceChoice: string;
}

export interface Challenge {
  id: number;
  title: string;
  problem: string;
  task: string;
  icon: string;
}