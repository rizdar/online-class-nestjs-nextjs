import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import appConfig from './app.config';
import zoomConfig from './zoom.config';
import jwtConfig from './jwt.config';
import redisConfig from './redis.config';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [appConfig, zoomConfig, jwtConfig, redisConfig],
    }),
  ],
})
export class ConfigModule {}
