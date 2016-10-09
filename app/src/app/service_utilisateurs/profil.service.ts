import { Injectable } from '@angular/core';
import { HttpClient } from '../service_login/http-client.service';
import { Http, Headers } from '@angular/http';
@Injectable()
export class ProfilService {

  constructor(private httpClient: HttpClient,private http: Http) {}
  handleSomething() {
    console.log('handle something execute');
    return this.httpClient
    .get('/memberinfo')
    .map(res => res.json())
    .map((res) => {
      console.log(res);
      return res;
    });
  }

}
