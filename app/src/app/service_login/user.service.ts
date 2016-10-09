import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// Statics

@Injectable()
export class UserService {
  private loggedIn = false;
  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  signin(newUser){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(newUser);
    return this.http
      .post('/signin',JSON.stringify({newUser}),{ headers })
      .map(res => res.json())
      .map((res) =>{
        if (res.success){
          console.log(res.msg);
        }
        return res.success
      });
  }
  login(login) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        '/authenticate',
        JSON.stringify({ login }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          console.log(res);
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }
  loginFacebook(token){
    localStorage.setItem('auth_token', token);
    this.loggedIn = true;
  }
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
