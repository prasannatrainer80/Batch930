import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient : HttpClient) { }

  showPendingOrder(custId : number) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/customerOrders/" +custId);
  }

  showCustomerOrders(custId : number) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/customerPendingOrders/" +custId);
  }

  placeOrder(orders : Orders) : Observable<any> {
    return this._httpClient.post("http://localhost:1111/placeOrder/",orders)
  }
}
