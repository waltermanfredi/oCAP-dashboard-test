import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedService implements CanActivate{

  constructor(public auth: TokenService, public router: Router) { }

  canActivate(): boolean {
    let logged = this.auth.isValidToken();
    if (!logged) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
