import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TRANSLATIONS, CHALLENGES, AGENDA_DATA, DAY_PLAYBOOK } from './constants';
import { Language, DaySchedule } from './types';
import {
  Menu, X, Globe, ChevronRight, Copy, Check, Terminal,
  MapPin, Calendar, Clock, Award, AlertCircle, Users, WifiOff, ExternalLink, QrCode, Database, FileText, Sparkles, ArrowUp
} from 'lucide-react';
import DayOneGallery from './components/DayOneGallery';
import PlaybookSection from './components/PlaybookSection';
import { AgendaItem } from './components/AgendaItem';
import { DayProgressIndicator } from './components/DayProgressIndicator';
import { MotionProvider } from './context/MotionContext';
import { useToast } from './hooks/useToast';
import { useScrollMemory } from './hooks/useScrollMemory';
import { ToastContainer } from './components/ToastContainer';

const ParallaxBackground = () => {
  const { scrollY } = useScroll();

  // 5-layer parallax with varying speeds and directions
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);  // Fastest, forward
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]); // Fast, backward
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);  // Medium, forward
  const y4 = useTransform(scrollY, [0, 1000], [0, -100]); // Slow, backward
  const y5 = useTransform(scrollY, [0, 1000], [0, 50]);   // Slowest, forward

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Top-right, brand blue, largest */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
      />
      {/* Layer 2: Bottom-left, purple */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"
      />
      {/* Layer 3: Center-right, teal, subtle */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-teal-500/3 rounded-full blur-3xl"
      />
      {/* Layer 4: Top-left, indigo, small */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-1/4 left-1/3 w-[250px] h-[250px] bg-indigo-500/4 rounded-full blur-3xl"
      />
      {/* Layer 5: Bottom-right, pink accent */}
      <motion.div
        style={{ y: y5 }}
        className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] bg-pink-500/3 rounded-full blur-3xl"
      />
    </div>
  );
};

const getInitialDayIndex = (): number => {
  const now = new Date();
  const eventStart = new Date(now.getFullYear(), 10, 25); // Nov 25
  const diffDays = Math.floor((now.getTime() - eventStart.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 0;
  if (diffDays > 2) return 2;
  return diffDays;
};

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(getInitialDayIndex);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = TRANSLATIONS[lang];
  const challenges = CHALLENGES[lang];
  const agenda = AGENDA_DATA[lang];
  const playbook = DAY_PLAYBOOK[lang];

  // Toast notifications
  const { toasts, dismiss, success, error } = useToast();

  // Scroll memory for language toggle
  const { saveScroll, restoreScroll } = useScrollMemory('lang-toggle');

  // Hero image parallax
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup: restore overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Scroll progress for scrollytelling and subtle parallax
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setScrollProgress(0);
        return;
      }
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      setScrollProgress(next);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      success(lang === 'pt' ? 'Copiado!' : 'Copied!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      error(lang === 'pt' ? 'Erro ao copiar' : 'Failed to copy');
    }
  };

  // Handle language toggle with scroll memory
  const handleLanguageToggle = () => {
    saveScroll();
    setLang(lang === 'pt' ? 'en' : 'pt');
    setTimeout(() => restoreScroll(), 50);
  };

  // Handle day change with scroll navigation
  const handleDayChange = (dayIndex: number) => {
    setActiveDay(dayIndex);
    // Smooth scroll to agenda section
    setTimeout(() => {
      const agendaEl = document.getElementById('agenda');
      if (agendaEl) {
        const yOffset = -100; // Offset for fixed nav
        const y = agendaEl.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertCircle': return <AlertCircle className="w-6 h-6 text-brand-blue" />;
      case 'Users': return <Users className="w-6 h-6 text-brand-blue" />;
      case 'WifiOff': return <WifiOff className="w-6 h-6 text-brand-blue" />;
      default: return <AlertCircle className="w-6 h-6 text-brand-blue" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'next':
        return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'now':
        return 'bg-brand-light text-brand-blue border border-brand-light';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  };

  const statusLabels = useMemo(() => ({
    done: lang === 'pt' ? 'Concluído' : 'Done',
    next: lang === 'pt' ? 'Próximo' : 'Next',
    upcoming: lang === 'pt' ? 'A seguir' : 'Upcoming',
    now: lang === 'pt' ? 'Agora' : 'Now'
  }), [lang]);

  const agendaStatuses = useMemo(() => {
    const day = agenda[activeDay];
    if (!day) return [];

    const now = new Date();
    const baseDate = new Date(now.getFullYear(), 10, 25 + activeDay);

    const firstUpcomingIndex = day.items.findIndex((item) => {
      const [hours, minutes] = item.time.split(':').map((value) => parseInt(value, 10) || 0);
      const itemDate = new Date(baseDate);
      itemDate.setHours(hours, minutes, 0, 0);
      return itemDate.getTime() > now.getTime();
    });

    if (firstUpcomingIndex === -1) {
      return day.items.map((_, idx) => (idx === day.items.length - 1 ? 'now' : 'done'));
    }

    return day.items.map((_, idx) => {
      if (idx < firstUpcomingIndex) return 'done';
      if (idx === firstUpcomingIndex) return 'next';
      return 'upcoming';
    });
  }, [activeDay, agenda]);

  const checkpointReminder = useMemo(() => {
    const day = agenda[activeDay];
    if (!day) return null;

    const checkpointIndex = day.items.findIndex((item) => item.title.toLowerCase().includes('checkpoint'));
    if (checkpointIndex === -1) return null;

    return {
      label: day.items[checkpointIndex].title,
      time: day.items[checkpointIndex].time,
      status: agendaStatuses[checkpointIndex]
    };
  }, [activeDay, agenda, agendaStatuses]);

  return (
    <div className="min-h-screen bg-[#f6f7f8] selection:bg-brand-blue selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Logo placeholder */}
            {/* Logo */}
            <img src="/images/logo.png" alt="HackaTransparency Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain" />
            <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-900 hidden sm:block">
              HackaTransparency
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button onClick={() => scrollToSection('roadmap')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{lang === 'pt' ? 'Roteiro' : 'Roadmap'}</button>
            <button onClick={() => scrollToSection('agenda')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navAgenda}</button>
            <button onClick={() => scrollToSection('code')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navResources}</button>
            <button onClick={() => scrollToSection('challenges')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navChallenges}</button>
            <button onClick={() => scrollToSection('prizes')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navPrizes}</button>

            <div className="h-4 w-px bg-slate-300"></div>

            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors"
              aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
            >
              <Globe className="w-4 h-4" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <a
              href="https://forms.gle/n6WU2L7Er9q6UlfF47"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20"
            >
              {t.ctaRegister}
            </a>
          </div>

          {/* Mobile: Language Toggle + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-brand-blue bg-brand-light/50 hover:bg-brand-light rounded-full transition-all active:scale-95"
              aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}
            >
              <Globe className="w-4 h-4" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              className="p-3 -mr-2 text-slate-600 active:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-white/50">
          <div
            className="h-full bg-brand-blue transition-[width] duration-200"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            aria-hidden="true"
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl animate-fade-in flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
              aria-label={lang === 'pt' ? 'Fechar menu' : 'Close menu'}
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="flex flex-col gap-4 items-center text-center">
              <button
                onClick={() => scrollToSection('roadmap')}
                className="text-xl font-light text-slate-900 py-3 px-6 hover:text-brand-blue transition-colors w-full max-w-xs active:scale-98"
              >
                {lang === 'pt' ? 'Roteiro' : 'Roadmap'}
              </button>
              <button
                onClick={() => scrollToSection('agenda')}
                className="text-xl font-light text-slate-900 py-3 px-6 hover:text-brand-blue transition-colors w-full max-w-xs active:scale-98"
              >
                {t.navAgenda}
              </button>
              <button
                onClick={() => scrollToSection('code')}
                className="text-xl font-light text-slate-900 py-3 px-6 hover:text-brand-blue transition-colors w-full max-w-xs active:scale-98"
              >
                {t.navResources}
              </button>
              <button
                onClick={() => scrollToSection('challenges')}
                className="text-xl font-light text-slate-900 py-3 px-6 hover:text-brand-blue transition-colors w-full max-w-xs active:scale-98"
              >
                {t.navChallenges}
              </button>
              <button
                onClick={() => scrollToSection('prizes')}
                className="text-xl font-light text-slate-900 py-3 px-6 hover:text-brand-blue transition-colors w-full max-w-xs active:scale-98"
              >
                {t.navPrizes}
              </button>

              <div className="h-px w-24 bg-slate-200 my-4"></div>

              <a
                href="https://forms.gle/n6WU2L7Er9q6UlfF47"
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full max-w-xs px-8 py-4 bg-brand-blue text-white text-base font-medium rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20 active:scale-98 text-center"
              >
                {t.ctaRegister}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements - Parallax */}
        <ParallaxBackground />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-light text-brand-blue text-xs font-semibold mb-6 sm:mb-8 uppercase tracking-wider"
            >
              CoST Mozambique Infrastructure
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-4 sm:mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-100">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="text-sm font-medium">{t.locationVenue}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2.5 rounded-full shadow-sm border border-slate-100">
                <Calendar className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="text-sm font-medium">{t.eventDates}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://forms.gle/n6WU2L7Er9q6UlfF47"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-brand-blue text-white text-base font-semibold rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2"
              >
                {t.ctaRegister}
                <ChevronRight className="w-4 h-4" />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('roadmap')}
                className="px-8 py-4 bg-white text-slate-700 text-base font-semibold rounded-full hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center gap-2"
              >
                {t.ctaDocs}
              </motion.button>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 mt-3">{t.ctaAssurance}</p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('roadmap')}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-600 hover:text-brand-blue hover:border-brand-blue transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              {t.scrollCue}
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <motion.div
              style={{ scale: heroScale, y: heroY }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 will-change-transform"
            >
              <img
                src="/images/day-1/07cef934-bf43-4636-9f34-2fe4c972ce4d.JPG"
                alt="Hackathon Vibes"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            {/* Decorative elements behind image */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24 lg:space-y-32">

        {/* Day Playbook */}
        <PlaybookSection
          playbook={playbook}
          activeDay={activeDay}
          setActiveDay={setActiveDay}
          agenda={agenda}
          lang={lang}
        />

        {/* Intro / About */}
        <section id="about" className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute -inset-4 bg-brand-light/50 rounded-full blur-2xl -z-10"></div>
              <img
                src="/images/about_community.png"
                alt="Community collaboration"
                className="rounded-2xl sm:rounded-3xl shadow-lg w-full object-cover h-56 sm:h-64 md:h-80"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4 sm:mb-6 tracking-tight">{t.sectionAbout}</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 sm:mb-6">
              {t.aboutText}
            </p>
            <a href="https://moz-frontend-585607441751.us-central1.run.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-blue font-medium hover:underline active:opacity-70 py-2">
              {t.visitPortal} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            {/* Main Portal Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light/50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{t.mainPortalTitle}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{t.mainPortalDesc}</p>
                  </div>
                </div>
                <a
                  href="https://moz-frontend-585607441751.us-central1.run.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-dark transition-all shadow-md shadow-brand-blue/20 active:scale-95 group-hover:shadow-lg"
                >
                  {t.visitPortal}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Datastore Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light/50 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Database className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{t.datastoreTitle}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{t.datastoreDesc}</p>
                  </div>
                </div>
                <a
                  href="https://datastore.infrastructuretransparency.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-dark transition-all shadow-md shadow-brand-blue/20 active:scale-95 group-hover:shadow-lg"
                >
                  {t.visitDatastore}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section id="challenges" className="scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3 sm:mb-4 tracking-tight">{t.sectionChallenges}</h2>
            <p className="text-sm sm:text-base text-slate-500 px-4">{t.challengesSubtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.15,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  y: -12,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-white to-slate-50/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-300 relative overflow-hidden group cursor-default"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                  style={{ zIndex: 0 }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'linear',
                    repeatDelay: 1
                  }}
                  style={{ zIndex: 1 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-purple-500/10 flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut',
                      delay: idx * 0.2
                    }}
                  >
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-brand-blue/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut'
                      }}
                    />
                    <div className="relative z-10">
                      {getIcon(challenge.icon)}
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 group-hover:text-brand-blue transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.2 }}
                  >
                    {challenge.title}
                  </motion.h3>

                  <div className="space-y-3 sm:space-y-4 flex-grow">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + 0.3 }}
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem</span>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{challenge.problem}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 + 0.4 }}
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Goal</span>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">{challenge.task}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-blue/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ zIndex: 0 }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2 tracking-tight">{t.sectionAgenda}</h2>
              <p className="text-sm sm:text-base text-slate-500">Three days of intense collaboration and innovation.</p>
            </div>

            <div className="flex p-1 bg-white border border-slate-200 rounded-full shadow-sm overflow-x-auto no-scrollbar">
              {agenda.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDayChange(index)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeDay === index
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 active:bg-slate-50'
                    }`}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>

          {checkpointReminder && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border border-slate-100 shadow-sm rounded-2xl p-4 sm:p-5 mb-6">
              <div className="p-2 rounded-lg bg-brand-light text-brand-blue">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{lang === 'pt' ? 'Próximo checkpoint' : 'Next checkpoint'}</p>
                <p className="text-sm sm:text-base font-semibold text-slate-900">{checkpointReminder.time} • {checkpointReminder.label}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(checkpointReminder.status)}`}>
                {statusLabels[checkpointReminder.status as keyof typeof statusLabels]}
              </span>
            </div>
          )}

          {/* Mobile Progress Header - Hidden on lg+ */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden sticky top-20 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3 mb-4 rounded-t-2xl shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Progress Bar */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-700">
                    {agendaStatuses.filter(s => s === 'done').length} / {agenda[activeDay].items.length}
                  </span>
                  <span className="text-xs text-slate-500">
                    {lang === 'pt' ? 'concluído' : 'done'}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(agendaStatuses.filter(s => s === 'done').length / agenda[activeDay].items.length) * 100}%`
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-dark rounded-full"
                  />
                </div>
              </div>

              {/* Next Event */}
              {agendaStatuses.findIndex(s => s === 'next') !== -1 && (
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">
                    {lang === 'pt' ? 'Próximo' : 'Next'}
                  </p>
                  <p className="text-xs font-medium text-brand-blue">
                    {agenda[activeDay].items[agendaStatuses.findIndex(s => s === 'next')].time}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_280px] gap-6">
            {/* Progress Indicator - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block order-2">
              <DayProgressIndicator
                totalItems={agenda[activeDay].items.length}
                doneCount={agendaStatuses.filter(s => s === 'done').length}
                nextIndex={agendaStatuses.findIndex(s => s === 'next')}
                lang={lang}
              />
            </div>

            {/* Agenda Items */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] sm:min-h-[500px] order-1">
            <div className="p-5 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{agenda[activeDay].title}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {agenda[activeDay].items.map((item, idx) => {
                const status = (agendaStatuses[idx] as 'done' | 'next' | 'upcoming' | 'now') || 'upcoming';
                return (
                  <AgendaItem
                    key={idx}
                    item={item}
                    index={idx}
                    status={status}
                    statusLabel={statusLabels[status]}
                    statusStyle={getStatusStyle(status)}
                    speaker={t.speaker}
                  />
                );
              })}
            </div>
            </div>
          </div>
        </section>

        {/* Day One Gallery */}
        <DayOneGallery lang={lang} />

        {/* Developer Resources */}
        <section id="data" className="bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden text-white shadow-2xl relative scroll-mt-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 bg-brand-blue rounded-lg">
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">API Endpoints</h2>
              </div>

              <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 leading-relaxed">
                Access project data in JSON format compatible with OC4IDS 1.1. Publicly accessible and updated daily.
                <br /><br />
                <a href="https://standard.open-contracting.org/infrastructure/latest/en/" className="text-brand-blue hover:text-white transition-colors underline decoration-brand-blue/30 active:opacity-70">Read OC4IDS Documentation &rarr;</a>
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Base Endpoint</div>
                  <div className="group relative bg-slate-950 rounded-lg sm:rounded-xl p-3 sm:p-4 font-mono text-xs sm:text-sm text-slate-300 border border-slate-800 flex items-center justify-between gap-2">
                    <span className="truncate flex-1 min-w-0">https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData</span>
                    <button
                      onClick={() => copyToClipboard('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')}
                      className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-md transition-colors text-slate-400 hover:text-white flex-shrink-0"
                      aria-label={copied ? (lang === 'pt' ? 'Copiado' : 'Copied') : (lang === 'pt' ? 'Copiar URL' : 'Copy URL')}
                      aria-live="polite"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Format</div>
                    <div className="font-mono text-xs sm:text-sm text-brand-blue">JSON (OC4IDS 1.1)</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Rate Limit</div>
                    <div className="font-mono text-xs sm:text-sm text-brand-blue">60 req/hour</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12 bg-slate-950 font-mono text-xs sm:text-sm relative overflow-hidden overflow-x-auto">
              <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs">example_request.sh</span>
              </div>
              <div className="space-y-4 text-slate-300">
                <p>
                  <span className="text-purple-400"># Get all projects</span>
                  <br />
                  <span className="text-brand-blue">curl</span> https://.../getOC4IDSData
                </p>
                <p>
                  <span className="text-purple-400"># Filter by date range</span>
                  <br />
                  <span className="text-brand-blue">curl</span> "https://.../getOC4IDSData?<br />
                  &nbsp;&nbsp;<span className="text-yellow-400">startDate</span>=2022-01-01&<br />
                  &nbsp;&nbsp;<span className="text-yellow-400">endDate</span>=2026-01-01"
                </p>
                <div className="mt-8 pt-8 border-t border-slate-900">
                  <p className="text-slate-500 italic">Response:</p>
                  <pre className="text-green-400 mt-2 opacity-70">
                    {`[
  {
    "id": "mz-project-001",
    "title": "Reabilitação da Estrada N1",
    "status": "implementation",
    "period": {
       "startDate": "2024-02-10"
    }
  },
  ...
]`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OC4IDS Documentation */}
        <section className="scroll-mt-20">
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand-light/50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative max-w-4xl">
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3 tracking-tight">{t.oc4idsStandardTitle}</h2>
                  <p className="text-base text-slate-600 leading-relaxed mb-6">
                    {t.oc4idsStandardDesc}
                  </p>
                  <a
                    href="https://standard.open-contracting.org/infrastructure/latest/en/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-dark transition-all shadow-md shadow-brand-blue/20 active:scale-95 group-hover:shadow-lg"
                  >
                    {t.readDocumentation}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prizes */}
        <section id="prizes" className="text-center scroll-mt-20 relative overflow-hidden">
          {/* Celebratory background particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 text-sm font-semibold mb-8 sm:mb-10 border border-yellow-200 shadow-lg shadow-yellow-500/10 relative"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <Award className="w-4 h-4" />
            </motion.div>
            {t.sectionPrizes}
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
            />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-end relative pt-8">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3, type: 'spring', stiffness: 400 }
              }}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-slate-200 order-2 sm:order-1 relative z-0 overflow-hidden group cursor-default"
            >
              {/* Silver shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-100/50 opacity-0 group-hover:opacity-100"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />

              {/* Confetti burst on hover */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-slate-400 rounded-full"
                    animate={{
                      y: [-10, -40],
                      x: [(i - 4) * 5, (i - 4) * 15],
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                  />
                ))}
              </motion.div>

              <motion.div
                className="text-3xl sm:text-4xl font-bold text-slate-300 mb-3 sm:mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                2
              </motion.div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">2º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <motion.p
                className="text-slate-600 text-lg font-bold mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, color: '#64748b' }}
              >
                75,000 MT
              </motion.p>
              <motion.div
                className="h-1 w-12 bg-gradient-to-r from-slate-300 to-slate-400 mx-auto rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <p className="mt-3 sm:mt-4 font-medium text-slate-700">{t.prizeTablet}</p>
            </motion.div>

            {/* 1st Place - THE CHAMPION! */}
            <motion.div
              initial={{ opacity: 0, y: 150, scale: 0.7 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0,
                duration: 1,
                type: 'spring',
                stiffness: 80,
                damping: 10
              }}
              animate={{
                y: [-4, 4, -4],
              }}
              transition={{
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
              }}
              whileHover={{
                scale: 1.08,
                rotateY: 5,
                transition: { duration: 0.3, type: 'spring', stiffness: 300 }
              }}
              className="bg-gradient-to-br from-brand-blue via-brand-dark to-purple-900 p-8 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-brand-blue/30 text-white order-1 sm:order-2 transform sm:-translate-y-8 relative z-10 overflow-hidden group cursor-default"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/20"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              />

              {/* Golden rays */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-full bg-gradient-to-t from-yellow-400/20 to-transparent origin-bottom"
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Trophy badge */}
              <motion.div
                className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-yellow-900 shadow-xl shadow-yellow-500/50 z-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut'
                }}
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                {/* Sparkle effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-yellow-300"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </motion.div>

              {/* Confetti explosion */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: ['#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6'][i % 4],
                    }}
                    animate={{
                      y: [0, -60],
                      x: [(i - 8) * 8, (i - 8) * 20],
                      opacity: [1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: (i * 0.1) % 2,
                      ease: 'easeOut'
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="text-5xl sm:text-6xl font-bold text-white/30 mb-3 sm:mb-4 relative z-10"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(251,191,36,0.5)',
                    '0 0 40px rgba(251,191,36,0.8)',
                    '0 0 20px rgba(251,191,36,0.5)'
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                1
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 relative z-10">1º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <motion.p
                className="text-yellow-300 font-bold text-2xl mb-4 sm:mb-6 relative z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    '0 0 10px rgba(253,224,71,0.5)',
                    '0 0 20px rgba(253,224,71,0.8)',
                    '0 0 10px rgba(253,224,71,0.5)'
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                100,000 MT
              </motion.p>
              <motion.div
                className="h-1 w-16 bg-white/40 mx-auto rounded-full relative z-10"
                animate={{
                  scaleX: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <p className="mt-4 sm:mt-6 font-semibold relative z-10">{t.prizeTabletPhone}</p>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
                damping: 12
              }}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { duration: 0.3, type: 'spring', stiffness: 400 }
              }}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-2 border-slate-200 order-3 relative z-0 overflow-hidden group cursor-default"
            >
              {/* Bronze shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-transparent to-amber-100/30 opacity-0 group-hover:opacity-100"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />

              {/* Confetti burst on hover */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full"
                    animate={{
                      y: [-10, -40],
                      x: [(i - 4) * 5, (i - 4) * 15],
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                  />
                ))}
              </motion.div>

              <motion.div
                className="text-3xl sm:text-4xl font-bold text-slate-300 mb-3 sm:mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.3 }}
              >
                3
              </motion.div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">3º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <motion.p
                className="text-slate-600 text-lg font-bold mb-3 sm:mb-4"
                whileHover={{ scale: 1.1, color: '#64748b' }}
              >
                50,000 MT
              </motion.p>
              <motion.div
                className="h-1 w-12 bg-gradient-to-r from-amber-300 to-amber-400 mx-auto rounded-full"
                animate={{ scaleX: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              />
              <p className="mt-3 sm:mt-4 font-medium text-slate-700">{t.prizeSmartphone}</p>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="relative bg-white border-t border-slate-200 pt-12 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img src="/images/footer_maputo.png" alt="Maputo Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="max-w-xs">
              <img src="/images/logo.png" alt="HackaTransparency Logo" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain mb-4 sm:mb-6" />
              <p className="text-slate-500 text-sm leading-relaxed">
                {t.footerTagline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 w-full md:w-auto">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4">{t.footerContact}</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="break-all">costmozinfo@fe.gov.mz</li>
                  <li>Maputo, Mozambique</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 sm:mb-4">{t.footerLegal}</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>{t.footerTerms}</li>
                  <li>{t.footerPrivacy}</li>
                  <li>{t.footerCode}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center md:text-left">{t.footerCopyright}</p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <button className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors active:scale-95" aria-label="Social media">
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top FAB - Mobile First */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-brand-blue text-white rounded-full shadow-xl hover:bg-brand-dark transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
          aria-label={lang === 'pt' ? 'Voltar ao topo' : 'Scroll to top'}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MotionProvider>
      <AppContent />
    </MotionProvider>
  );
};

export default App;
