import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { UtilsModule } from './utils/utils.module';
import { RepositoriesModule } from './repositories/repositories.module';

import { ConfigModule } from './config/config.module';

@Module({
  imports: [ApiModule, UtilsModule, RepositoriesModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}