import { motion } from 'framer-motion';

interface DayProgressIndicatorProps {
  totalItems: number;
  doneCount: number;
  nextIndex: number;
  lang: 'pt' | 'en';
}

export function DayProgressIndicator({
  totalItems,
  doneCount,
  nextIndex,
  lang
}: DayProgressIndicatorProps) {
  const progressPercent = (doneCount / totalItems) * 100;
  const upcomingCount = totalItems - doneCount - (nextIndex !== -1 ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-900">
          {lang === 'pt' ? 'Progresso do Dia' : 'Day Progress'}
        </h4>
        <span className="text-xs font-mono text-slate-500">
          {doneCount}/{totalItems}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-blue to-brand-dark rounded-full"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-emerald-50 rounded-lg p-2">
          <div className="text-lg font-bold text-emerald-700">{doneCount}</div>
          <div className="text-[10px] text-emerald-600 uppercase tracking-wide">
            {lang === 'pt' ? 'Feito' : 'Done'}
          </div>
        </div>
        {nextIndex !== -1 && (
          <div className="bg-amber-50 rounded-lg p-2">
            <div className="text-lg font-bold text-amber-700">1</div>
            <div className="text-[10px] text-amber-600 uppercase tracking-wide">
              {lang === 'pt' ? 'Próximo' : 'Next'}
            </div>
          </div>
        )}
        {upcomingCount > 0 && (
          <div className="bg-slate-50 rounded-lg p-2">
            <div className="text-lg font-bold text-slate-700">{upcomingCount}</div>
            <div className="text-[10px] text-slate-600 uppercase tracking-wide">
              {lang === 'pt' ? 'Pendente' : 'Upcoming'}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
