import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '../models/permission';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentPermissionSubject: BehaviorSubject<Permission>;
  public currentPermission: Observable<Permission>;

  constructor(private http: HttpClient) {
    this.currentPermissionSubject = new BehaviorSubject<Permission>(
      JSON.parse(sessionStorage.getItem('currentPermission') || '{}')
    );
    this.currentPermission = this.currentPermissionSubject.asObservable();
  }

  public get currentPermissionValue(): Permission {
    return this.currentPermissionSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<Permission>(`${environment.apiUrl}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentPermission', JSON.stringify(user));
          this.currentPermissionSubject.next(user);
          return user;
        })
      );
  }
}
