import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Code2, Sparkles, ChevronRight } from 'lucide-react';
import { CodeExample, Language } from '../types';

interface CodePlaygroundProps {
  examples: CodeExample[];
  lang: Language;
  t: {
    sectionCodePlayground: string;
    codePlaygroundSubtitle: string;
    copyCode: string;
    copied: string;
    askAI: string;
  };
  onAskAI?: (code: string, example: CodeExample) => void;
  onCopySuccess?: () => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ examples, lang, t, onAskAI, onCopySuccess }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      onCopySuccess?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Extract unique tags
  const allTags = Array.from(new Set(examples.flatMap(ex => ex.tags)));
  const filteredExamples = selectedTag === 'all'
    ? examples
    : examples.filter(ex => ex.tags.includes(selectedTag));

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'javascript': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'python': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'bash': return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <section id="code" className="scroll-mt-20">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-brand-blue/10 border border-purple-500/20 mb-4">
          <Code2 className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">
            {t.sectionCodePlayground}
          </span>
        </div>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
          {t.codePlaygroundSubtitle}
        </p>
      </div>

      {/* Tag Filter - Horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
            selectedTag === 'all'
              ? 'bg-brand-blue text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang === 'pt' ? 'Todos' : 'All'}
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              selectedTag === tag
                ? 'bg-brand-blue text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Code Examples Grid - Mobile-first, card-based */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredExamples.map((example, index) => (
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-base truncate">
                    {example.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {example.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex-shrink-0 ${getLanguageColor(example.language)}`}>
                  {example.language === 'javascript' ? 'JS' : example.language}
                </span>
              </div>
            </div>

            {/* Code Block */}
            <div className="flex-1 bg-slate-950 p-4 relative overflow-x-auto">
              <pre className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
                <code>{example.code}</code>
              </pre>
            </div>

            {/* Output Preview (if available) */}
            {example.output && (
              <div className="px-4 py-2 bg-emerald-950 border-t border-emerald-900/50">
                <div className="text-[10px] text-emerald-400/70 font-mono mb-1">
                  {lang === 'pt' ? 'Saída:' : 'Output:'}
                </div>
                <div className="text-xs text-emerald-400 font-mono truncate">
                  {example.output}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
              <motion.button
                onClick={() => copyToClipboard(example.code, example.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-sm"
                aria-label={copiedId === example.id ? t.copied : t.copyCode}
              >
                {copiedId === example.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.copyCode}</span>
                  </>
                )}
              </motion.button>

              {onAskAI && (
                <motion.button
                  onClick={() => onAskAI(example.code, example)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                  aria-label={t.askAI}
                  title={t.askAI}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.button>
              )}
            </div>

            {/* Tags */}
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {example.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Helper CTA */}
      {onAskAI && (
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-brand-light rounded-2xl sm:rounded-3xl border border-purple-100">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-brand-blue flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                {lang === 'pt' ? 'Precisa de Ajuda?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-slate-600">
                {lang === 'pt'
                  ? 'Alfred pode explicar qualquer código, sugerir melhorias, ou gerar exemplos personalizados.'
                  : 'Alfred can explain any code, suggest improvements, or generate custom examples.'}
              </p>
            </div>
            <button
              onClick={() => onAskAI('', examples[0])}
              className="px-6 py-3 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-dark transition-all shadow-lg shadow-brand-blue/20 active:scale-95 flex items-center gap-2 flex-shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.askAI}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CodePlayground;
