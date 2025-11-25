import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, CHALLENGES, AGENDA_DATA } from './constants';
import { Language, DaySchedule } from './types';
import {
  Menu, X, Globe, ChevronRight, Copy, Check, Terminal,
  MapPin, Calendar, Clock, Award, AlertCircle, Users, WifiOff, ExternalLink, QrCode, Database
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[lang];
  const challenges = CHALLENGES[lang];
  const agenda = AGENDA_DATA[lang];

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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback: alert user that copy failed
      alert('Failed to copy. Please copy manually: ' + text);
    }
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

  return (
    <div className="min-h-screen bg-[#f6f7f8] selection:bg-brand-blue selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo placeholder */}
            {/* Logo */}
            <img src="/images/logo.png" alt="HackaTransparency Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-semibold text-lg tracking-tight text-slate-900 hidden sm:block">
              HackaTransparency
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('agenda')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navAgenda}</button>
            <button onClick={() => scrollToSection('challenges')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navChallenges}</button>
            <button onClick={() => scrollToSection('data')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navData}</button>
            <button onClick={() => scrollToSection('prizes')} className="text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors">{t.navPrizes}</button>

            <div className="h-4 w-px bg-slate-300 mx-2"></div>

            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
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

          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(true)}
            aria-label={lang === 'pt' ? 'Abrir menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl animate-fade-in p-6 flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col gap-8 mt-12 items-center text-center">
            <button onClick={() => scrollToSection('agenda')} className="text-2xl font-light text-slate-900">{t.navAgenda}</button>
            <button onClick={() => scrollToSection('challenges')} className="text-2xl font-light text-slate-900">{t.navChallenges}</button>
            <button onClick={() => scrollToSection('data')} className="text-2xl font-light text-slate-900">{t.navData}</button>
            <button onClick={() => scrollToSection('prizes')} className="text-2xl font-light text-slate-900">{t.navPrizes}</button>
            <button
              onClick={() => { setLang(lang === 'pt' ? 'en' : 'pt'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-brand-blue flex items-center gap-2 mt-4"
            >
              <Globe className="w-5 h-5" />
              Switch to {lang === 'pt' ? 'English' : 'Português'}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-blue text-xs font-semibold mb-8 uppercase tracking-wider">
              CoST Mozambique Infrastructure Initiative
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 tracking-tight leading-[1.1] mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-medium">ISUTC, Room 101</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span className="text-sm font-medium">Nov 25–27</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="https://forms.gle/n6WU2L7Er9q6UlfF47"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white text-base font-medium rounded-full hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20 hover:scale-[1.02]"
              >
                {t.ctaRegister}
              </a>
              <button
                onClick={() => scrollToSection('data')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 text-base font-medium rounded-full hover:bg-slate-50 transition-all border border-slate-200 shadow-sm hover:scale-[1.02]"
              >
                {t.ctaDocs}
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-brand-blue/10 rounded-3xl transform rotate-3 scale-105"></div>
            <img
              src="/images/hero_collaboration.png"
              alt="Diverse team collaborating"
              className="relative rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-all duration-500 object-cover h-[600px] w-full"
            />
          </div>
        </div>

        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-32">

        {/* Intro / About */}
        <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-brand-light/50 rounded-full blur-2xl -z-10"></div>
              <img
                src="/images/about_community.png"
                alt="Community collaboration"
                className="rounded-3xl shadow-lg w-full object-cover h-64 md:h-80"
              />
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 tracking-tight">{t.sectionAbout}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {t.aboutText}
            </p>
            <a href="https://moz-frontend-585607441751.us-central1.run.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-blue font-medium hover:underline">
              Visit Main Portal <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all order-1 md:order-2 h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -mr-8 -mt-8"></div>
            <h3 className="text-xl font-medium text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-brand-blue">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Official App</p>
                  <p className="text-xs text-slate-500">moz-frontend...run.app</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 text-brand-blue">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">CoST Datastore</p>
                  <p className="text-xs text-slate-500">datastore.infrastructuretransparency.org</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Challenges */}
        <section id="challenges">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">{t.sectionChallenges}</h2>
            <p className="text-slate-500">Three distinct tracks designed to transform raw data into citizen impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center mb-6">
                  {getIcon(challenge.icon)}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{challenge.title}</h3>
                <div className="space-y-4 flex-grow">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Problem</span>
                    <p className="text-sm text-slate-600 mt-1">{challenge.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Goal</span>
                    <p className="text-sm text-slate-600 mt-1">{challenge.task}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">{t.sectionAgenda}</h2>
              <p className="text-slate-500">Three days of intense collaboration and innovation.</p>
            </div>

            <div className="flex p-1 bg-white border border-slate-200 rounded-full shadow-sm">
              {agenda.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeDay === index
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl font-semibold text-slate-900">{agenda[activeDay].title}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {agenda[activeDay].items.map((item, idx) => (
                <div key={idx} className={`p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-12 hover:bg-slate-50 transition-colors ${item.type === 'break' ? 'bg-slate-50/80' : ''}`}>
                  <div className="flex items-center gap-3 w-40 flex-shrink-0">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-mono text-sm text-slate-600 font-medium">{item.time}</span>
                    <span className="text-xs text-slate-400 px-2 py-0.5 rounded-md bg-slate-100">{item.duration}</span>
                  </div>
                  <div>
                    <h4 className={`text-lg font-medium ${item.type === 'break' ? 'text-slate-500 italic' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                    )}
                    {item.responsible && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">Speaker</span>
                        <span className="text-xs text-slate-500">{item.responsible}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Resources */}
        <section id="data" className="bg-slate-900 rounded-3xl overflow-hidden text-white shadow-2xl relative scroll-mt-24">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-brand-blue rounded-lg">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">API Endpoints</h2>
              </div>

              <p className="text-slate-400 mb-8 leading-relaxed">
                Access project data in JSON format compatible with OC4IDS 1.1. Publicly accessible and updated daily.
                <br /><br />
                <a href="https://standard.open-contracting.org/infrastructure/latest/en/" className="text-brand-blue hover:text-white transition-colors underline decoration-brand-blue/30">Read OC4IDS Documentation &rarr;</a>
              </p>

              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Base Endpoint</div>
                  <div className="group relative bg-slate-950 rounded-xl p-4 font-mono text-sm text-slate-300 border border-slate-800 flex items-center justify-between">
                    <span className="truncate mr-4">https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData</span>
                    <button
                      onClick={() => copyToClipboard('https://us-central1-mozportal-31b5c.cloudfunctions.net/getOC4IDSData')}
                      className="p-2 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
                      aria-label={copied ? (lang === 'pt' ? 'Copiado' : 'Copied') : (lang === 'pt' ? 'Copiar URL' : 'Copy URL')}
                      aria-live="polite"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Format</div>
                    <div className="font-mono text-brand-blue">JSON (OC4IDS 1.1)</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">Rate Limit</div>
                    <div className="font-mono text-brand-blue">60 req/hour</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-slate-950 font-mono text-sm relative overflow-hidden">
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

        {/* Prizes */}
        <section id="prizes" className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold mb-8 border border-yellow-100">
            <Award className="w-4 h-4" />
            {t.sectionPrizes}
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
            {/* 2nd Place */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 order-2 md:order-1 relative z-0">
              <div className="text-4xl font-bold text-slate-200 mb-4">2</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">2º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <p className="text-slate-500 text-sm mb-4">75,000 MT</p>
              <div className="h-1 w-12 bg-slate-200 mx-auto rounded-full"></div>
              <p className="mt-4 font-medium text-slate-700">Tablet</p>
            </div>

            {/* 1st Place */}
            <div className="bg-gradient-to-b from-brand-blue to-brand-dark p-8 rounded-3xl shadow-xl text-white order-1 md:order-2 transform md:-translate-y-4 relative z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-yellow-900 shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-6xl font-bold text-white/20 mb-4">1</div>
              <h3 className="text-2xl font-bold mb-2">1º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <p className="text-brand-light font-medium mb-6">100,000 MT</p>
              <div className="h-1 w-16 bg-white/30 mx-auto rounded-full"></div>
              <p className="mt-6 font-semibold">Tablet + Smartphone</p>
            </div>

            {/* 3rd Place */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 order-3 relative z-0">
              <div className="text-4xl font-bold text-slate-200 mb-4">3</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">3º {lang === 'pt' ? 'Lugar' : 'Place'}</h3>
              <p className="text-slate-500 text-sm mb-4">50,000 MT</p>
              <div className="h-1 w-12 bg-slate-200 mx-auto rounded-full"></div>
              <p className="mt-4 font-medium text-slate-700">Smartphone</p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="relative bg-white border-t border-slate-200 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <img src="/images/footer_maputo.png" alt="Maputo Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <img src="/images/logo.png" alt="HackaTransparency Logo" className="w-12 h-12 rounded-xl object-contain mb-6" />
              <p className="text-slate-500 text-sm leading-relaxed">
                Empowering Mozambique through open data and citizen-led innovation in infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>costmozinfo@fe.gov.mz</li>
                  <li>Maputo, Mozambique</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li>Terms of Participation</li>
                  <li>Privacy Policy</li>
                  <li>Code of Conduct</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-100">
            <p className="text-xs text-slate-400">© 2025 CoST Mozambique. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-blue hover:text-white transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;