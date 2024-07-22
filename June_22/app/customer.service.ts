import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
