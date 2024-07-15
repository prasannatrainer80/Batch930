import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { sha512 } from 'js-sha512';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser: any = this.authenticationService?.currentUserValue;
    const unixNumber: any = `${new Date()}${Math.floor(Math.random() * 10e5)}`;
    // const unixNumber: any = `${Math.floor(10000000 + Math.random() * 90000000)}`;
    const csrfToken: any = this.encryptBody(request?.body, unixNumber, request?.url);
    const currentUrl: any = sessionStorage.getItem('currentUrl');
   
    if (currentUser && currentUser?.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${currentUser.jwt}`,
          reqkey: currentUser?.reqKey || 'NA',
          reqtoken: currentUser?.reqToken || 'NA',
          reqval: unixNumber || 'NA',
          csrftoken: csrfToken || 'NA',
          curl: currentUrl || 'NA'
          
        },
      });
    }
    else {
      request = request.clone({
        setHeaders: {
          reqkey: currentUser?.reqKey || 'NA',
          reqtoken: currentUser?.reqToken || 'NA',
          reqval: unixNumber,
          csrftoken: csrfToken || 'NA',
          curl: currentUrl || 'NA'
        },
      });
    }
    return next.handle(request);
  }
  encryptBody(body: any, salt: any, url:any): string {
    try {
      if(url?.toLowerCase().indexOf('/upload/files') > -1) return 'NA';

      let x = ''; for (let i = 0; i < salt.length;) { x += salt[i]; i = i + 2; }
      const data = JSON.stringify(body) + salt + x;
      return sha512.create().update(data).hex();
    } catch (e) { return 'NA'; }
  }
}
