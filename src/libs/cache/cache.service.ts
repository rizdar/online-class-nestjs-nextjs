import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache(key: string, value: any, ttl: number = 1000) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async getCache(key: string) {
    return await this.cacheManager.get(key);
  }
}
