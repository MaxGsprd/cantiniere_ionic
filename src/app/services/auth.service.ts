import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url = "http://localhost:8080/lunchtime/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  login(credentials) : Promise<any> {
    return this.http.post<any>(this.api_url+'login', credentials, {observe: "response"}).toPromise();
  }
  
  forgotPassword(email): Observable<any>  {
    let obs: Observable<any>
    const url = this.api_url+'forgotpassword';
    obs = this.http.post(url+"?email=" + email.email,{})
    console.log(obs)
    return obs;
  };
}
