import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private common: CommonService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginId: string, password: string) {
    return this.http.post(`${environment.loginUrl}/loginapi/auth/signin`, {
      loginId,
      token: btoa(password),
    }).pipe(map((user: any) => {
      if (user?.code == '0') {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('currentUser', JSON.stringify(user?.data));

        if (!this.common.isEmpty(user?.data?.msg)) {
          this.common.infoNotify(user?.data?.msg);
        }

        this.currentUserSubject.next(user?.data);
      }
      return user;
    }));
  }

  switchSelection(userInfo: User) {
  
    sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
    // sessionStorage.setItem('currentUser', JSON.parse(userInfo));
    this.currentUserSubject.next(userInfo);
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}
