import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import appConfig from './app.config';

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class ConfigModule {}
