import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const header = this.auth.getAuthHeader();

    // Si no hay credenciales guardadas, manda el request normal
    if (!header) return next.handle(req);

    // Adjunta Authorization a todo request hacia tu backend
    const isApi = req.url.startsWith('http://localhost:8081/');
    if (!isApi) return next.handle(req);

    return next.handle(req.clone({
      setHeaders: { Authorization: header }
    }));
  }
}
