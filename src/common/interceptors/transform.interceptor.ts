import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GenericResponse } from '../interfaces/generic-response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, GenericResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GenericResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const { url } = request;
    if (url?.includes('download')) {
      return next.handle();
    } else {
      return next.handle().pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message || null,
          payload: data.payload || null,
        })),
      );
    }
  }
}
