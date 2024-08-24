import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData } from '../../youtube/models/video-response.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCjG062_CpuRfmYg-0u-8iWLjKbdG9eJ6g';
  intercept(
    req: HttpRequest<ResponseData>,
    next: HttpHandler,
  ): Observable<HttpEvent<ResponseData>> {
    // Добавляем базовый URL к запросу
    const apiUrlReq = req.clone({
      url: `${this.baseUrl}${req.url}`,
    });
    const params = new HttpParams({
      fromString: apiUrlReq.params.toString(),
    }).set('key', this.apiKey);
    const urlWithParamsReq = apiUrlReq.clone({ params });
    // Добавляем заголовок Authorization с токеном

    // Передаем измененный запрос дальше
    return next.handle(urlWithParamsReq);
  }
}
