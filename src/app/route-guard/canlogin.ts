import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

import { FirebaseService } from './../firebase.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: FirebaseService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.auth.isAuthenticated();
  }
}