import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    Logger.log(`A ${request.method} request is initiated at ${new Date()}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `The initiated ${request.method} successeded and took ${
              Date.now() - now
            }ms`,
          ),
        ),
      );
  }
}
