import { useEffect, useRef } from 'react';

/**
 * Hook to save and restore scroll position across state changes
 * Fixes friction points: language toggle, day switcher, lightbox close
 */
export function useScrollMemory(key: string, enabled: boolean = true) {
  const scrollPosRef = useRef<number>(0);

  // Save current scroll position
  const saveScroll = () => {
    if (enabled) {
      scrollPosRef.current = window.scrollY;
      sessionStorage.setItem(`scroll-${key}`, String(window.scrollY));
    }
  };

  // Restore saved scroll position
  const restoreScroll = () => {
    if (enabled) {
      const saved = sessionStorage.getItem(`scroll-${key}`);
      if (saved) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(saved), behavior: 'auto' });
        });
      }
    }
  };

  // Clear saved position
  const clearScroll = () => {
    sessionStorage.removeItem(`scroll-${key}`);
    scrollPosRef.current = 0;
  };

  return { saveScroll, restoreScroll, clearScroll, scrollPosRef };
}

/**
 * Hook to save scroll position before unmount and restore on mount
 */
export function useScrollRestore(key: string) {
  const { saveScroll, restoreScroll } = useScrollMemory(key);

  useEffect(() => {
    // Restore on mount
    restoreScroll();

    // Save on unmount
    return () => saveScroll();
  }, []);
}
