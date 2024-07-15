import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class APICallService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  post(url: string, paylod: any) {
    let apiUrl: any = `${environment.apiUrl}${url}`;

    if (url.toLocaleLowerCase().indexOf('/reqapi/') !== -1) {
      apiUrl = `${environment.apiUrl}${url}`;
    } else if (url.toLocaleLowerCase().indexOf('/appapi/') !== -1) {
      apiUrl = `${environment.appUrl}${url}`;
    } else if (url.toLocaleLowerCase().indexOf('/courseapi/') !== -1) {
      apiUrl = `${environment.courseUrl}${url}`;
    } else if (url.toLocaleLowerCase().indexOf('/loginapi/') !== -1) {
      apiUrl = `${environment.loginUrl}${url}`;
    } else if (url.toLocaleLowerCase().indexOf('/dataapi/') !== -1) {
      apiUrl = `${environment.dataUrl}${url}`;
    } else if (url.toLocaleLowerCase().indexOf('/studentapi/') !== -1) {
      apiUrl = `${environment.dataUrl}${url}`;
    }

    return this.http.post(apiUrl, paylod).pipe(
      map((apiResp: any) => {
        if (
          window.location.toString().indexOf('localhost:') == -1 &&
          (apiResp?.code == '401' || apiResp?.status == '401')
        ) {
          // auto logout if 401 response returned from api
          sessionStorage.removeItem('currentUser');
          this.router.navigate(['/authentication/signin']);
        } else {
          return apiResp;
        }
      })
    );
  }
  get(url: string) {
    let apiUrl: any = url;
    return this.http.get(apiUrl).pipe(map((apiResp: any) => apiResp));
  }
  UploadFile(formFileData: any) {
    let uploadURL = `${environment.uploadUrl}/assetsapi/upload/files`;
    let headers = { Accept: 'multipart/form-data' };
    return this.http.post(uploadURL, formFileData, { headers: headers }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  isEmpty(text: string): boolean {
    if (text == null || text == undefined || text == '') {
      return true;
    }
    return false;
  }
  isEmptyObj(data: any): boolean {
    if (
      data == null ||
      data == undefined ||
      data.length == 0 ||
      Object.keys(data).length == 0
    ) {
      return true;
    }
    return false;
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
  isNumber(value: string): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }

  checkPrice(data: string, allowZero: boolean) {
    if (this.isEmpty(data)) return false;
    if (allowZero) {
      if (isNaN(Number(data))) return false;
    } else {
      if (data == '0') return false;
      if (isNaN(Number(data))) return false;
    }
    return true;
  }
}
