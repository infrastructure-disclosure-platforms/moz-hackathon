import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'bg-green-500/90 text-white',
  error: 'bg-red-500/90 text-white',
  info: 'bg-blue-500/90 text-white',
};

export function Toast({ message, type, onClose }: ToastProps) {
  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        ${colors[type]}
        backdrop-blur-sm border border-white/10
        max-w-md pointer-events-auto
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
