/**
 * Image Cache Utility
 * Manages localStorage caching for AI vision analysis results
 */

import type { VisionAnalysisResponse } from '../types';

const CACHE_VERSION = 'v1';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

interface CachedInsight {
  insight: VisionAnalysisResponse;
  version: string;
  cachedAt: number;
}

/**
 * Get cached insight for an image
 * @param imageUrl - The image URL
 * @param lang - Language (pt or en)
 * @returns Cached insight or null if not found/expired
 */
export function getCachedInsight(
  imageUrl: string,
  lang: 'pt' | 'en'
): VisionAnalysisResponse | null {
  const key = `alfred_vision_${CACHE_VERSION}_${imageUrl}_${lang}`;
  const filename = imageUrl.split('/').pop();

  try {
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log(`[Cache] MISS for ${filename} (${lang})`);
      return null;
    }

    const data: CachedInsight = JSON.parse(cached);

    // Check version
    if (data.version !== CACHE_VERSION) {
      console.log(`[Cache] Version mismatch for ${filename}, clearing`);
      localStorage.removeItem(key);
      return null;
    }

    // Check expiry
    if (Date.now() - data.cachedAt > CACHE_EXPIRY) {
      console.log(`[Cache] Expired for ${filename}, clearing`);
      localStorage.removeItem(key);
      return null;
    }

    console.log(`[Cache] HIT for ${filename} (${lang}): "${data.insight.title}"`);
    return data.insight;
  } catch (error) {
    console.error(`[Cache] Error reading for ${filename}:`, error);
    return null;
  }
}

/**
 * Store insight in cache
 * @param imageUrl - The image URL
 * @param lang - Language (pt or en)
 * @param insight - The vision analysis result
 */
export function setCachedInsight(
  imageUrl: string,
  lang: 'pt' | 'en',
  insight: VisionAnalysisResponse
): void {
  const key = `alfred_vision_${CACHE_VERSION}_${imageUrl}_${lang}`;
  const filename = imageUrl.split('/').pop();

  try {
    const data: CachedInsight = {
      insight,
      version: CACHE_VERSION,
      cachedAt: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(data));
    console.log(`[Cache] SAVED ${filename} (${lang}): "${insight.title}"`);
  } catch (error) {
    console.error(`[Cache] Error writing ${filename}:`, error);
    // If storage is full, try clearing old caches
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      clearOldCaches();
      // Retry once
      try {
        localStorage.setItem(key, JSON.stringify({
          insight,
          version: CACHE_VERSION,
          cachedAt: Date.now(),
        }));
      } catch (retryError) {
        console.error('Error writing cache after cleanup:', retryError);
      }
    }
  }
}

/**
 * Clear old/expired caches to free up space
 */
function clearOldCaches(): void {
  const now = Date.now();
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('alfred_vision_')) {
      try {
        const data: CachedInsight = JSON.parse(localStorage.getItem(key) || '{}');

        // Remove if expired or wrong version
        if (
          data.version !== CACHE_VERSION ||
          now - data.cachedAt > CACHE_EXPIRY
        ) {
          keysToRemove.push(key);
        }
      } catch (error) {
        // Remove if corrupted
        keysToRemove.push(key);
      }
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
  console.log(`Cleared ${keysToRemove.length} old cache entries`);
}

/**
 * Clear all Alfred vision caches
 */
export function clearAllCaches(): void {
  const keysToRemove: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('alfred_vision_')) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach(key => localStorage.removeItem(key));
  console.log(`Cleared all ${keysToRemove.length} cache entries`);
}
