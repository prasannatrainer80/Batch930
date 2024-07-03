import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient) { }

  showCustomer() : Observable<any>{
    return this._httpClient.get("http://localhost:1111/showCustomer");
  }
}
