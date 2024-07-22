import { Component } from '@angular/core';
import { Orders } from '../orders';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-customer-pending-orders',
  templateUrl: './customer-pending-orders.component.html',
  styleUrl: './customer-pending-orders.component.css'
})
export class CustomerPendingOrdersComponent {

  orders : Orders[];
  custId : number;
  constructor(private _orderService : OrdersService) {
    this.custId = parseInt(localStorage.getItem("cid"));
    this._orderService.showPendingOrder(this.custId).subscribe(x => {
      this.orders = x;
    })
  }
}
