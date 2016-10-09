import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../service_login/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private userService: UserService,private router: Router,private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      data: this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }
  submitted = false;
  onSubmit(login) {
    this.userService.login(login).subscribe((result) => {
      if (result) {
        console.log("You are login ! you can access to /home");
        this.router.navigate(['/home']);
      }
    });
  }
}
