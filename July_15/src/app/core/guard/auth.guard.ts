import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue) {
      if (route.data['jwt'] && route.data['jwt'].indexOf('.') === -1) {
        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
