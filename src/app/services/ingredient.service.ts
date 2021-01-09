import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  api_url = "http://localhost:8080/lunchtime/";
  httpOptions : any;

  constructor(public http: HttpClient, private token_service: TokenStorageService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token_service.getToken()
      })
    }
  }

  async getIgrdImage(igrd_id: number): Promise<any> {
    return this.http.get<any>(this.api_url+'ingredient/findimg/'+igrd_id).toPromise();
  }

  async getAllIgrd(): Promise<any> {
    return this.http.get<any>(this.api_url+'ingredient/findall', this.httpOptions).toPromise();
  }

  async addIgrd(obj: any): Promise<any> {
    return this.http.put<any>(this.api_url+'ingredient/add', obj, this.httpOptions).toPromise();
  }
}
