import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private _httpClient : HttpClient) { }

  showCustomerWallet(custId : number) : Observable<any> {
    return this._httpClient.get("http://localhost:1111/showCustomerWallet/"+custId);
  }
}
