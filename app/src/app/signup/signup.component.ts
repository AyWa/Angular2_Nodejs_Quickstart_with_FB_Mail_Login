import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../service_login/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private userService: UserService,private router:Router,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      profile: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        city: [],
        phone: [],
        birthDay: ['', Validators.required],
        gender: ['', Validators.required]
      }),
      data: this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
    });
  }
  onSignin(newUser) {
    console.log(newUser);
    this.userService.signin(newUser).subscribe((result) => {
      if (result) {
        console.log("You are signin");
        this.router.navigate(['/login']);
      }else{
        console.log("fail to signin");
      }
    });
  }
}
