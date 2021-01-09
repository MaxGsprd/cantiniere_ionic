import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CantiniereService {

  api_url = "http://localhost:8080/lunchtime/";
  token ='';
  httpOptions: any;

  constructor( private http: HttpClient, private token_service: TokenStorageService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token_service.getToken()
      })
    }
  }

  async getMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findall", this.httpOptions).toPromise();
  }

  async addMenu(obj: any) : Promise<any> {
    return this.http.put<any>(this.api_url+"menu/add", obj, this.httpOptions).toPromise();
  }

  async getImageMenus(id_menu : number): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findimg/"+id_menu).toPromise();
  }

  async getWeekMenus(): Promise<any>{
    return this.http.get<any>(this.api_url+"menu/findallavailablefortoday").toPromise();
  }

  async getWeekMeal(): Promise<any>{
    return this.http.get<any>(this.api_url+"meal/findallavailableforweek/1").toPromise();
  }

  async getImageMeal(id_meal: number): Promise<any> {
    return this.http.get<any>(this.api_url+'meal/findimg/'+id_meal).toPromise();
  }

  async getMealById(id_meal: number): Promise<any> {
    return this.http.get<any>(this.api_url+'meal/find/'+id_meal).toPromise();
  }

  findById(id:number) {
    return this.http.get(this.api_url + 'menu/find/' + id);
  }

  
  async getMenuById(id:number): Promise<any> {
    return this.http.get(this.api_url + 'menu/find/' + id).toPromise();
  }

  async updateMenu(id:number, obj: any): Promise<any> {
    return this.http.patch<any>(this.api_url + 'menu/update/'+id, obj, this.httpOptions).toPromise();
  }

  async updateMenuImage(id: number, obj:any): Promise<any> {
    return this.http.patch<any>(this.api_url + 'menu/updateimg/'+id, obj, this.httpOptions).toPromise();
  }
}
