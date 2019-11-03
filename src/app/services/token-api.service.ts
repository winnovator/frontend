import { JWTToken } from '../models/jwttoken';
import { Login } from './../models/login';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenApiService {

  private url = `${environment.apiUrl}`;
  private login: Login;
  private jwtToken: JWTToken;
  constructor(private http: HttpClient) { }

  async getJWTToken(): Promise<void> {
  this.login = new Login();
  this.login.email = 'test@test.nl';
  this.login.password = 'doeternuniettoe';
  const res = this.http.post<{token: string}>(`${this.url}token/`, this.login).toPromise();
  this.jwtToken = new JWTToken();
  this.jwtToken.token = (await res).token;
  localStorage.setItem('jwttoken', JSON.stringify(this.jwtToken));
}
}
