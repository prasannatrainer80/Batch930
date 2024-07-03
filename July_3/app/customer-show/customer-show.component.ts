import { Component } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-show',
  templateUrl: './customer-show.component.html',
  styleUrl: './customer-show.component.css'
})
export class CustomerShowComponent {

  customers :Customer[];

  constructor(private _customerService : CustomerService) {
    this._customerService.showCustomer().subscribe(x => {
      this.customers = x;
    })
  }
}
