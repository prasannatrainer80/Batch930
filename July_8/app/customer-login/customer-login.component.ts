import { Component } from '@angular/core';
import { Customer } from '../customer';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  customer : Customer;
  isValid : boolean;
  count : string;
  customerFound : Customer;
  login(loginForm : NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.isValid = true;
    this._customerService.validateCustomer(this.customer.cusUsername, this.customer.cusPassword).subscribe(x=> {
      // alert(x);
      if (x=='1') {
        // alert("Navigating...");
        this._customerService.searchByUserName(this.customer.cusUsername).subscribe(x => {
          this.customerFound = x;
          localStorage.setItem("cid",this.customerFound.cusId.toString());
          // alert(localStorage.getItem("cid"));
        });
        this._router.navigate(["customerDashBoard"]);
      } else {
        alert("Wrong");
      }
    })

  }
  constructor(private _customerService : CustomerService,private _router : Router) {
    this.isValid = false;
    this.customer = new Customer();
  }
}
