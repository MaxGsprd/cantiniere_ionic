import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { TokenStorageService } from './token-storage.service';

const API_ROOT = 'http://localhost:8080/lunchtime/meal/';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  
  httpOptions : any

  constructor(private http:HttpClient, private token_service: TokenStorageService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token_service.getToken()
      })
    };
  }

  findById(id:number) {
    return this.http.get(API_ROOT + "find/" + id);
  }

  async findAll() : Promise<any> {
    return this.http.get<any>(API_ROOT + 'findall', this.httpOptions).toPromise();
  }

  async addMeal(obj: any): Promise<any> {
    return this.http.put<any>(API_ROOT + 'add', obj, this.httpOptions).toPromise();
  }

  async updateMeal(id:number, obj: any): Promise<any> {
    return this.http.patch<any>(API_ROOT + 'update/'+id, obj, this.httpOptions).toPromise();
  }
  
  async updateMealImage(id: number, obj:any): Promise<any> {
    return this.http.patch<any>(API_ROOT + 'updateimg/'+id, obj, this.httpOptions).toPromise();
  }
}
