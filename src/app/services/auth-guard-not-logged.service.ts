import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardNotLoggedService implements CanActivate{

  constructor(public auth: TokenService, public router: Router) { }

  canActivate(): boolean {
    let logged = this.auth.isLoggedIn();
    if (logged) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
