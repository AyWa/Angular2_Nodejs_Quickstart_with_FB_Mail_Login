import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../service_login/user.service';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [NgbDatepickerConfig]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private userService: UserService,private router:Router,private formBuilder: FormBuilder,private config: NgbDatepickerConfig) {
    this.config.minDate = {year: 1900, month: 1, day: 1};
    this.config.maxDate = {year: moment().get('year')-13, month: moment().get('month'), day: moment().get('date')};
  }
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
    newUser.profile.birthDay= moment(newUser.profile.birthDay).format('YYYY MM DD');
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
