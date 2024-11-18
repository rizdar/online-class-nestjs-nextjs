import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheMdl } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import redisConfig from 'src/config/redis.config';
const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
  imports: [
    CacheMdl.register<RedisClientOptions>({
      store: redisStore,
      url: redisConfig().URL,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
