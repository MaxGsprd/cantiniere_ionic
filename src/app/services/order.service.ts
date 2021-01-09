import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commande } from '../models/Commande';
import { TokenStorageService } from './token-storage.service';
import { formatDate } from '@angular/common'

const ORDER_ROOT = "http://localhost:8080/lunchtime/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOptions : any;

  constructor(
    private http:HttpClient, private token_storage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token_storage.getToken()
      })
    }
  }

  addOrder(cart) {
    console.log(cart)
    return this.http.put(ORDER_ROOT + '/add', JSON.stringify(cart), this.httpOptions);
  }

  findAll(): Observable<any> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findall', this.httpOptions);
  }

  findAllbyUser(id: number): Observable<any> {
    return this.http.get<Commande[]>(ORDER_ROOT + '/findallforuser/' + id, this.httpOptions);
  }

  findTodayOrders(): Observable<any> {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    console.log(today)
    return this.http.get<Commande[]>(ORDER_ROOT + '/findallbetweendateinstatus?status=0&beginDate='+today+'&endDate='+today, this.httpOptions)
  }

  cancel(id: number) {
    return this.http.patch(ORDER_ROOT + '/cancel/' + id, {}, this.httpOptions);
  }

  pay(id: number) {
    return this.http.patch(ORDER_ROOT + '/deliverandpay/' + id + '/' + 1, {}, this.httpOptions);
  }
}
