/**
 * Robust localStorage management utilities
 * Handles quota limits, JSON parsing errors, and browser compatibility
 */

export interface StorageItem<T = any> {
  data: T;
  timestamp: number;
  expiresAt?: number;
}

export class StorageManager {
  private static readonly QUOTA_EXCEEDED_ERRORS = [
    'QuotaExceededError',
    'NS_ERROR_DOM_QUOTA_REACHED',
    'QUOTA_EXCEEDED_ERR'
  ];

  /**
   * Check if localStorage is available and working
   */
  static isAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get item from localStorage with automatic JSON parsing
   */
  static getItem<T = any>(key: string): T | null {
    if (!this.isAvailable()) return null;

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item) as StorageItem<T>;

      // Check expiration
      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        this.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn(`Failed to parse localStorage item "${key}":`, error);
      this.removeItem(key); // Clean up corrupted data
      return null;
    }
  }

  /**
   * Set item in localStorage with automatic JSON stringification
   */
  static setItem<T = any>(key: string, data: T, expiresInMs?: number): boolean {
    if (!this.isAvailable()) return false;

    try {
      const item: StorageItem<T> = {
        data,
        timestamp: Date.now(),
        expiresAt: expiresInMs ? Date.now() + expiresInMs : undefined
      };

      const serialized = JSON.stringify(item);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      if (this.isQuotaError(error)) {
        console.warn('localStorage quota exceeded, attempting cleanup...');
        this.cleanupOldItems();

        // Try again after cleanup
        try {
          const item: StorageItem<T> = {
            data,
            timestamp: Date.now(),
            expiresAt: expiresInMs ? Date.now() + expiresInMs : undefined
          };
          localStorage.setItem(key, JSON.stringify(item));
          return true;
        } catch {
          console.error('localStorage quota still exceeded after cleanup');
          return false;
        }
      }

      console.error(`Failed to set localStorage item "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  static removeItem(key: string): boolean {
    if (!this.isAvailable()) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove localStorage item "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all items with a specific prefix
   */
  static clearItemsWithPrefix(prefix: string): number {
    if (!this.isAvailable()) return 0;

    let removedCount = 0;
    const keysToRemove: string[] = [];

    // Collect keys to remove (avoid modifying localStorage during iteration)
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }

    // Remove collected keys
    keysToRemove.forEach(key => {
      if (this.removeItem(key)) {
        removedCount++;
      }
    });

    return removedCount;
  }

  /**
   * Get storage usage information
   */
  static getStorageInfo(): { used: number; available: number; total: number } | null {
    if (!this.isAvailable()) return null;

    try {
      // Estimate using current storage
      let used = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          if (value) {
            used += key.length + value.length;
          }
        }
      }

      // Most browsers have 5MB limit (characters, not bytes)
      const total = 5 * 1024 * 1024;
      const available = total - used;

      return { used, available, total };
    } catch {
      return null;
    }
  }

  /**
   * Clean up old and expired items
   */
  static cleanupOldItems(): number {
    if (!this.isAvailable()) return 0;

    let removedCount = 0;
    const now = Date.now();
    const keysToRemove: string[] = [];

    // Collect expired items and old items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      try {
        const item = localStorage.getItem(key);
        if (!item) continue;

        const parsed = JSON.parse(item) as StorageItem;

        // Remove if expired
        if (parsed.expiresAt && parsed.expiresAt < now) {
          keysToRemove.push(key);
          continue;
        }

        // Remove old items (older than 30 days) if they look like our format
        if (parsed.timestamp && (now - parsed.timestamp) > 30 * 24 * 60 * 60 * 1000) {
          if (key.startsWith('cook-') || key.startsWith('nextauth')) {
            keysToRemove.push(key);
          }
        }
      } catch {
        // Remove corrupted items
        keysToRemove.push(key);
      }
    }

    // Remove collected keys
    keysToRemove.forEach(key => {
      if (this.removeItem(key)) {
        removedCount++;
      }
    });

    console.log(`Cleaned up ${removedCount} old localStorage items`);
    return removedCount;
  }

  /**
   * Check if error is due to quota limit
   */
  private static isQuotaError(error: any): boolean {
    return error && (
      this.QUOTA_EXCEEDED_ERRORS.includes(error.name) ||
      error.code === 22 ||
      error.code === 1014 ||
      error.message?.toLowerCase().includes('quota')
    );
  }

  /**
   * Get all keys with a specific prefix
   */
  static getKeysWithPrefix(prefix: string): string[] {
    if (!this.isAvailable()) return [];

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  }

  /**
   * Backup data to a JSON file
   */
  static exportData(keys?: string[]): string {
    if (!this.isAvailable()) return '';

    const data: Record<string, any> = {};
    const keysToExport = keys || this.getKeysWithPrefix('cook-');

    keysToExport.forEach(key => {
      const item = this.getItem(key);
      if (item) {
        data[key] = item;
      }
    });

    return JSON.stringify(data, null, 2);
  }

  /**
   * Import data from JSON
   */
  static importData(jsonData: string): boolean {
    if (!this.isAvailable()) return false;

    try {
      const data = JSON.parse(jsonData);
      let importedCount = 0;

      Object.entries(data).forEach(([key, value]) => {
        if (this.setItem(key, value)) {
          importedCount++;
        }
      });

      console.log(`Imported ${importedCount} items`);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

// Convenience functions for commonly used operations
export const storage = {
  get: <T>(key: string) => StorageManager.getItem<T>(key),
  set: <T>(key: string, data: T, expiresInMs?: number) => StorageManager.setItem(key, data, expiresInMs),
  remove: (key: string) => StorageManager.removeItem(key),
  clear: (prefix: string) => StorageManager.clearItemsWithPrefix(prefix),
  cleanup: () => StorageManager.cleanupOldItems(),
  isAvailable: () => StorageManager.isAvailable(),
  getInfo: () => StorageManager.getStorageInfo(),
  export: (keys?: string[]) => StorageManager.exportData(keys),
  import: (jsonData: string) => StorageManager.importData(jsonData)
};