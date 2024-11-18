import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { UtilsModule } from './utils/utils.module';
import { RepositoriesModule } from './repositories/repositories.module';

import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpLoggerModule } from './logger/http-logger/http-logger.module';
import { JwtAuthModule } from './libs/jwt-auth/jwt-auth.module';
import { CacheModule } from './libs/cache/cache.module';
import { ZoomModule } from './libs/zoom/zoom.module';

@Module({
  imports: [
    ApiModule,
    UtilsModule,
    RepositoriesModule,
    ConfigModule,
    PrismaModule,
    HttpLoggerModule,
    JwtAuthModule,
    CacheModule,
    ZoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
