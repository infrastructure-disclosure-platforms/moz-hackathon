import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { DayPlaybook, DaySchedule, Language } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import JourneyMap from './JourneyMap';

interface PlaybookSectionProps {
    playbook: DayPlaybook;
    activeDay: number;
    setActiveDay: (day: number) => void;
    agenda: DaySchedule[];
    lang: Language;
}

const PlaybookSection: React.FC<PlaybookSectionProps> = ({
    playbook,
    activeDay,
    setActiveDay,
    agenda,
    lang
}) => {
    // State for accordion
    const [expandedRoadmapDay, setExpandedRoadmapDay] = useState<number | null>(null);

    // Hooks for responsive behavior
    const isMobile = useIsMobile(768);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Animation timings based on device and preferences
    const animationDuration = prefersReducedMotion ? 0.05 : (isMobile ? 0.4 : 0.5);
    const staggerDelay = prefersReducedMotion ? 0.01 : (isMobile ? 0.08 : 0.1);

    return (
        <section id="roadmap" className="relative bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            <div className="p-6 sm:p-8 md:p-10 relative z-10">
                {/* Header & Day Switcher */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10">
                    <div className="flex-1 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-dark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-blue/20">
                            <Calendar className="w-3 h-3" />
                            {playbook.ribbon}
                        </div>

                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                                {playbook.heading}
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                                {playbook.subheading}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2 shadow-inner flex gap-1">
                            {agenda.map((day, index) => (
                                <motion.button
                                    key={day.date}
                                    onClick={() => setActiveDay(index)}
                                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                                    whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
                                    className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeDay === index
                                        ? 'bg-white text-brand-blue shadow-md scale-105 ring-1 ring-black/5'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                        }`}
                                >
                                    {day.date}
                                    {activeDay === index && (
                                        <motion.span
                                            className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-blue rounded-full border-2 border-white"
                                            animate={!prefersReducedMotion ? {
                                                scale: [1, 1.2, 1],
                                            } : {}}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        ></motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-slate-400 px-2">
                            {playbook.autoLabel}: {activeDay + 1}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8">

                        {/* Visual Journey Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-4"
                        >
                            <JourneyMap
                                activeDay={activeDay}
                                days={3}
                                orientation={isMobile ? 'vertical' : 'horizontal'}
                                prefersReducedMotion={prefersReducedMotion}
                            />
                        </motion.div>

                        {/* Checklists */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {playbook.checklist.map((block, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: idx * staggerDelay,
                                        duration: animationDuration,
                                        ease: 'easeOut'
                                    }}
                                    whileHover={!prefersReducedMotion ? {
                                        y: -4,
                                        transition: { duration: 0.2 }
                                    } : {}}
                                    className="group p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 hover:border-brand-light/50 cursor-default"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <motion.div
                                            className="p-2 rounded-lg bg-brand-light/50 text-brand-blue"
                                            whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
                                            animate={!prefersReducedMotion ? {
                                                scale: [1, 1.05, 1],
                                            } : {}}
                                            transition={{
                                                scale: {
                                                    repeat: Infinity,
                                                    duration: 2,
                                                    ease: 'easeInOut'
                                                }
                                            }}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </motion.div>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{block.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {block.items.map((item, itemIdx) => (
                                            <motion.li
                                                key={itemIdx}
                                                className="flex items-start gap-3 text-sm text-slate-700 group/item"
                                                whileHover={!prefersReducedMotion ? { x: 2 } : {}}
                                            >
                                                <motion.div
                                                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-brand-blue transition-colors"
                                                    whileHover={!prefersReducedMotion ? { scale: 1.5 } : {}}
                                                />
                                                <span className="leading-relaxed">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* Roadmap - Accordion on Mobile, Grid on Desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-5 sm:p-6 rounded-3xl border border-slate-100 bg-slate-50/50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <ArrowRight className="w-4 h-4 text-brand-blue" />
                                Sprint Roadmap
                            </h3>

                            {/* Desktop: Static Grid */}
                            {!isMobile && (
                                <div className="grid md:grid-cols-3 gap-6 relative">
                                    {/* Connecting Line */}
                                    <div className="hidden md:block absolute top-3 left-0 w-full h-0.5 bg-slate-200 -z-10 transform translate-y-2"></div>

                                    {playbook.roadmap.map((block, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1, duration: animationDuration }}
                                            className="relative"
                                        >
                                            <motion.div
                                                className={`w-4 h-4 rounded-full border-2 bg-white mb-4 z-10 relative ${
                                                    idx === activeDay ? 'border-brand-blue ring-4 ring-brand-blue/10' : 'border-slate-300'
                                                }`}
                                                animate={idx === activeDay && !prefersReducedMotion ? {
                                                    scale: [1, 1.1, 1],
                                                } : {}}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            ></motion.div>
                                            <div className={`text-xs font-bold uppercase tracking-wide mb-3 ${
                                                idx === activeDay ? 'text-brand-blue' : 'text-slate-500'
                                            }`}>{block.title}</div>
                                            <ul className="space-y-2">
                                                {block.items.map((item, itemIdx) => (
                                                    <li key={itemIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Mobile: Accordion */}
                            {isMobile && (
                                <div className="space-y-3">
                                    {playbook.roadmap.map((block, idx) => {
                                        const isExpanded = expandedRoadmapDay === idx;
                                        const isActive = idx === activeDay;

                                        return (
                                            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                                <button
                                                    onClick={() => setExpandedRoadmapDay(isExpanded ? null : idx)}
                                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors active:bg-slate-100"
                                                    aria-expanded={isExpanded}
                                                    aria-controls={`roadmap-day-${idx}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <motion.div
                                                            className={`w-3 h-3 rounded-full border-2 ${
                                                                isActive ? 'border-brand-blue bg-brand-blue' : 'border-slate-300 bg-white'
                                                            }`}
                                                            animate={isActive && !prefersReducedMotion ? {
                                                                scale: [1, 1.2, 1],
                                                            } : {}}
                                                            transition={{ repeat: Infinity, duration: 2 }}
                                                        ></motion.div>
                                                        <span className={`text-sm font-bold uppercase tracking-wide ${
                                                            isActive ? 'text-brand-blue' : 'text-slate-700'
                                                        }`}>{block.title}</span>
                                                    </div>
                                                    <motion.div
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        transition={{ duration: prefersReducedMotion ? 0.05 : 0.3 }}
                                                    >
                                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                                    </motion.div>
                                                </button>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            id={`roadmap-day-${idx}`}
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: prefersReducedMotion ? 0.05 : 0.3, ease: 'easeOut' }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-4 pb-4 pt-2 border-t border-slate-100">
                                                                <ul className="space-y-2">
                                                                    {block.items.map((item, itemIdx) => (
                                                                        <motion.li
                                                                            key={itemIdx}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: itemIdx * 0.05, duration: animationDuration }}
                                                                            className="text-sm text-slate-600 leading-relaxed flex items-start gap-2"
                                                                        >
                                                                            <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue flex-shrink-0"></span>
                                                                            {item}
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>

                </div>

            </div>
        </section>
    );
};

export default PlaybookSection;
