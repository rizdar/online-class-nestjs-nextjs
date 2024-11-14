import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    this.logger.log(
      `Logging HTTP Request ${req.method} ${req.url} ${res.statusCode}`,
    );
    next();
  }
}
