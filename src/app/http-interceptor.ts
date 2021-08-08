import { Injectable} from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = 'secure-user-token';
    const modifiedReq = req.clone({ 
      headers: req.headers.set('apikey', 'YXBpa2V5OmVwaS1hcGkxMjM'),
    });
    return next.handle(modifiedReq);
  }
}