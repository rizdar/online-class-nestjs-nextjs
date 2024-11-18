import { Module } from '@nestjs/common';
import { ZoomService } from './zoom.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils/utils.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [HttpModule, UtilsModule, CacheModule],
  providers: [ZoomService],
  exports: [ZoomService],
})
export class ZoomModule {}
