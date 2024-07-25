import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.css'
})
export class CustomerInfoComponent {
  custId : number;
  customer : Customer;
  constructor(private _customerService : CustomerService) {
    this.custId = parseInt(localStorage.getItem("cid"));
    // alert(this.custId);
    this._customerService.searchByCustomerId(this.custId).subscribe(x => {
      this.customer = x;
    })
  }
}
