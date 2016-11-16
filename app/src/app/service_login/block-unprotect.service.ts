import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class BlockUnprotectService {

constructor(private user: UserService,private router: Router) {}
  canActivate() {
    if(this.user.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }
    else return true;
  }
}
