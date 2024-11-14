import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { ResponseUtil } from './response/response.util';

@Module({
  providers: [UtilsService, ResponseUtil],
  exports: [UtilsService, ResponseUtil],
})
export class UtilsModule {}
