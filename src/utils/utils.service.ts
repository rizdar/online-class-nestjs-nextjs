import { Injectable, Logger } from '@nestjs/common';
import { ResponseUtil } from './response/response.util';

@Injectable()
export class UtilsService {
  constructor(private _response: ResponseUtil) {}
  logger(name: any) {
    return new Logger(name);
  }

  get response() {
    return this._response;
  }
}
