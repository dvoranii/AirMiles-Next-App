import { logger } from "./logger";

class StorageService {
  private isClient = typeof window !== "undefined";

  get<T>(key: string): T | null {
    if (!this.isClient) {
      logger.warn("Storage.get called on server", { key });
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      return JSON.parse(item) as T;
    } catch (error) {
      logger.error("Storage.get failed", { key, error });
      return null;
    }
  }

  set<T>(key: string, value: T): boolean {
    if (!this.isClient) {
      logger.warn("Storage.set called on server", { key });
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      logger.info("Storage.set success", { key });
      return true;
    } catch (error) {
      logger.error("Storage.set failed", { key, error });
      return false;
    }
  }

  remove(key: string): boolean {
    if (!this.isClient) {
      logger.warn("Storage.remove called on server", { key });
      return false;
    }

    try {
      localStorage.removeItem(key);
      logger.info("Storage.remove success", { key });
      return true;
    } catch (error) {
      logger.error("Storage.remove failed", { key, error });
      return false;
    }
  }

  clear(): boolean {
    if (!this.isClient) {
      logger.warn("Storage.clear called on server");
      return false;
    }

    try {
      localStorage.clear();
      logger.info("Storage.clear success");
      return true;
    } catch (error) {
      logger.error("Storage.clear failed", { error });
      return false;
    }
  }

  has(key: string): boolean {
    if (!this.isClient) return false;
    return localStorage.getItem(key) !== null;
  }
}

export const storage = new StorageService();
