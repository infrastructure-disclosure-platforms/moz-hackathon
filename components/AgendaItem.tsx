import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';
import { AgendaItem as AgendaItemType } from '../types';

interface AgendaItemProps {
  item: AgendaItemType;
  index: number;
  status: 'done' | 'next' | 'upcoming' | 'now';
  statusLabel: string;
  statusStyle: string;
  speaker: string;
}

// Timeline border styling based on status
const getTimelineStyle = (status: string) => {
  switch (status) {
    case 'done':
      return 'border-l-4 border-emerald-400'; // Solid green
    case 'now':
      return 'border-l-4 border-brand-blue animate-pulse'; // Pulsing blue
    case 'next':
      return 'border-l-4 border-amber-400'; // Solid amber
    default:
      return 'border-l-2 border-dashed border-slate-300'; // Dashed gray
  }
};

// Item type configuration for progressive disclosure
const itemTypeConfig = {
  sprint: { icon: '🚀', color: 'text-teal-600', bgColor: 'bg-teal-50', label: 'Sprint' },
  presentation: { icon: '📊', color: 'text-purple-600', bgColor: 'bg-purple-50', label: 'Presentation' },
  break: { icon: '☕', color: 'text-green-600', bgColor: 'bg-green-50', label: 'Break' },
  general: { icon: '📍', color: 'text-blue-600', bgColor: 'bg-blue-50', label: 'Session' }
};

export function AgendaItem({
  item,
  index,
  status,
  statusLabel,
  statusStyle,
  speaker
}: AgendaItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);

  const typeInfo = itemTypeConfig[item.type as keyof typeof itemTypeConfig] || itemTypeConfig.general;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      onTap={() => setIsExpanded(!isExpanded)}
      className={`
        relative
        ${getTimelineStyle(status)}
        ${status === 'now' ? 'bg-brand-light/30 shadow-lg shadow-brand-blue/10' : ''}
        ${status === 'next' ? 'bg-amber-50/30' : ''}
        ${item.type === 'break' ? 'bg-slate-50/80' : ''}
        p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 md:flex-row md:gap-12
        hover:bg-slate-50 transition-all duration-300
      `}
    >
      {/* Timeline connector dot */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-current" />
      <div className="flex items-center gap-2 sm:gap-3 md:w-44 flex-shrink-0 flex-wrap">
        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <span className="font-mono text-xs sm:text-sm text-slate-600 font-medium">{item.time}</span>

        {/* Progressive disclosure: Type badge on hover/tap */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-1 px-2 py-1 rounded-md ${typeInfo.bgColor}`}
            >
              <span className="text-xs">{typeInfo.icon}</span>
              <span className={`text-[10px] font-semibold ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-xs text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 whitespace-nowrap">{item.duration}</span>
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-base sm:text-lg font-medium ${item.type === 'break' ? 'text-slate-500 italic' : 'text-slate-900'}`}>
          {item.title}
        </h4>
        {item.description && (
          <p className="text-slate-500 text-sm mt-1 leading-relaxed">{item.description}</p>
        )}
        {item.responsible && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">{speaker}</span>
            <span className="text-xs text-slate-500">{item.responsible}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
