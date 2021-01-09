import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  api_url = "http://localhost:8080/lunchtime/";
  httpOptions : any;

  constructor(private http: HttpClient, private token_storage: TokenStorageService) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token_storage.getToken()
      })
    };
  }

  creditUser(id:number, amount: string) :Observable<any>{
    console.log(this.httpOptions);
    let parsedAmount = parseInt(amount);
    return this.http.post<any>(this.api_url+'user/credit/'+id+'?amount='+parsedAmount, {}, this.httpOptions);
  }

  debitUser(id:number, amount: any) :Observable<any> {
    let parsedAmount = parseInt(amount)
    return this.http.post<any>(this.api_url+'user/debit/'+id+'?amount='+parsedAmount, {}, this.httpOptions);
  }
}

