import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../service_login/user.service';

@Component({
  selector: 'app-facebook-auth',
  templateUrl: './facebook-auth.component.html',
  styleUrls: ['./facebook-auth.component.css']
})
export class FacebookAuthComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params
    .map(params => params['token'])
    .subscribe((token) => {
      console.log(token);
      this.userService.loginFacebook(token);
      this.router.navigate(['/home']);
  });
  }

}
