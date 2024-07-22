import { Component } from '@angular/core';
import { Orders } from '../orders';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {
  orders : Orders[];
  custId : number;
  constructor(private _orderService : OrdersService) {
    this.custId = parseInt(localStorage.getItem("cid"));
    this._orderService.showCustomerOrders(this.custId).subscribe(x => {
      this.orders = x;
    })
  }
}
