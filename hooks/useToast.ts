import { useState, useCallback } from 'react';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

/**
 * Hook for managing toast notifications
 * Standard feedback: icon + text, slide-in from top-right
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-dismiss after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    return show(message, 'success', duration);
  }, [show]);

  const error = useCallback((message: string, duration?: number) => {
    return show(message, 'error', duration);
  }, [show]);

  const info = useCallback((message: string, duration?: number) => {
    return show(message, 'info', duration);
  }, [show]);

  return { toasts, show, dismiss, success, error, info };
}
