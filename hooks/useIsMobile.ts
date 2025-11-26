import { useState, useEffect } from 'react';

/**
 * Hook to detect if viewport is mobile-sized
 * @param breakpoint - Max width in pixels (default: 768px)
 * @returns boolean indicating if viewport is mobile
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (SSR safety)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Update on resize
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [breakpoint]);

  return isMobile;
};
