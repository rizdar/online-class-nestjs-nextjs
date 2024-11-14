import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UtilsService {
  logger(name: any) {
    return new Logger(name);
  }
}
