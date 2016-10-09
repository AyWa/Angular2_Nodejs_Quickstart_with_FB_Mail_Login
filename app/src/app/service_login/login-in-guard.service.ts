import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoginInGuardService implements CanActivate{
  constructor(private user: UserService,private router: Router) {}

  canActivate() {
    let authToken = localStorage.getItem('auth_token');
    console.log(authToken);
    if(!this.user.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    else return true;
  }
}
