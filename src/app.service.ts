import { Injectable } from '@nestjs/common';
import appConfig from './config/app.config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!' + appConfig().app_name;
  }
}
