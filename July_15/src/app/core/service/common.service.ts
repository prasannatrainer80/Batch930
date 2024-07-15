import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  httpPost(url: string, paylod: any) {
    let apiUrl: any = `${environment.apiUrl}${url}`;

    if (url.toLocaleLowerCase().indexOf('/reqapi/') !== -1)
      apiUrl = `${environment.apiUrl}${url}`;
    else if (url.toLocaleLowerCase().indexOf('/appapi/') !== -1)
      apiUrl = `${environment.appUrl}${url}`;
    else if (url.toLocaleLowerCase().indexOf('/courseapp/') !== -1
      || url.toLocaleLowerCase().indexOf('/courseapi/') !== -1)
      apiUrl = `${environment.courseUrl}${url}`;
    else if (url.toLocaleLowerCase().indexOf('/loginapi/') !== -1)
      apiUrl = `${environment.loginUrl}${url}`;

    return this.http.post(apiUrl, paylod).pipe(map((apiResp: any) => {
      return apiResp;
    }));
  }

  permissions() {
    const currentUrl: any = sessionStorage.getItem('currentUrl');
    return this.httpPost('/appapi/masters/getrights', {
      path: currentUrl
    });
    // return this.http.post(`${environment.appUrl}/appapi/masters/getrights`,
    //   {
    //     path: currentUrl
    //   }).pipe(map((apiResp: any) => {
    //     return apiResp;
    //   }));
  }
  
  replaceAll(val: any): string {
    try {
      val = val.replace(/!BR!/g, '<br>');
      val = val.replace(/!LT!/g, '<');
      val = val.replace(/!GT!/g, '>');
    } catch (e) { }
    return val;
  }

  isEmpty(text?: string): boolean {
    if (text == null || text == undefined || text == "") {
      return true;
    } return false;
  }

  isEmptyObj(data: any): boolean {
    if (data == null || data == undefined || data.length == 0 || Object.keys(data).length == 0) {
      return true;
    } return false;
  }

  isNumber(value: string): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }

  infoNotify(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
      horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
      panelClass: 'snackbar-info',
    });
  }

  successNotify(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition,
      horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
      panelClass: 'snackbar-success',
    });
  }

  errorNotify(text: string) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition,
      horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
      panelClass: 'snackbar-danger',
    });
  }

  formatBytes(bytes: number, size: string, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + size;
  }
}
export class AppCache {
  key: string = "";
  val: any = null;
 }
