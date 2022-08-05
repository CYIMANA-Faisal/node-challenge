import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    Logger.log(
      `User made a ${req.method} request to ${
        req.originalUrl
      } at ${new Date()}`,
    );
    next();
  }
}
