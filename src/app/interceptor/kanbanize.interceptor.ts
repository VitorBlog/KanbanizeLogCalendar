import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthService} from "../service/auth.service";
import {environment} from "../../environments/environment";

@Injectable()
export class KanbanizeInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userData = this.authService.getUserData();
    if (userData && userData.key && userData.board) {
      request = request.clone({
        url: request.url.replace('@', userData.board + environment.base_url),
        setHeaders: {
          apikey: userData.key,
          accept: 'application/json'
        }
      });
    }

    if (environment.use_proxy) {
      request = request.clone({
        url: environment.proxy_address + request.url
      });
    }

    return next.handle(request);
  }
}
