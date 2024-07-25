import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from './orders';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient) { }

  validateCustomer(user : string, pwd : string) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/custAuthenticate/"+user+"/"+pwd);
  }

  searchByUserName(user : string) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/searchByUser/" +user);
  }

  searchByCustomerId(id : number) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/customer/" +id);
  }

  showMenu() : Observable<any> {
    return this._httpClient.get("http://localhost:1111/showMenu")
  }

  showVendor() : Observable<any> {
    return this._httpClient.get("http://localhost:1111/showVendor")
  }

  searchByMenu(id : number) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/menu/" +id);
  }

  // placeOrder(orders : Orders) : Observable<string> {
  //   return this.http.post("http://localhost:8080/CmsNew/webapi/orders/placeorder/",orders).
  //   map((res : Response) => res.text());
  // }


  placeOrder(orders : Orders) : Observable<any> {
    return this._httpClient.post("http://localhost:1111/placeOrder",orders)
  }
}
