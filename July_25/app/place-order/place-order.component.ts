import { Component } from '@angular/core';
import { Menu } from '../menu';
import { Vendor } from '../vendor';
import { CustomerService } from '../customer.service';
import { Orders } from '../orders';
import { WalletService } from '../wallet.service';
import { Wallet } from '../wallet';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  custId : number;
  menus : Menu[];
  vendors : Vendor[];
  wallets : Wallet[];
  model : Orders;
  menu = new Menu();
  menuFound = new Menu();
  wallet = new Wallet();
  vendor = new Vendor();
  price : number;
  result : string;
  constructor(private _customerService : CustomerService, private _walletService : WalletService) {
    this.custId = parseInt(localStorage.getItem("cid"))
    this.model = new Orders();
    this.model.cusId = this.custId;
    this._customerService.showMenu().subscribe(x => {
      this.menus =x;
    })

    this._customerService.showVendor().subscribe(x => {
      this.vendors = x;
    })

    this._walletService.showCustomerWallet(this.custId).subscribe(x => {
      this.wallets = x;
    })

      }
          showAmount() {
      let menId : number;
    menId=parseInt(this.menu.menItem);
    alert(menId);
    this._customerService.searchByMenu(menId).subscribe(x => {
      this.menuFound = x;
      alert(this.menuFound.menPrice)
      this.price = this.menuFound.menPrice;
      alert(this.price)
    })
   
    }

    placeOrder() {
      this.model.menId=parseInt(this.menu.menItem);
      this.model.venId=parseInt(this.vendor.venName);
      this.model.walSource = this.wallet.walSource;
      alert(this.model.ordComments);
      this._customerService.placeOrder(this.model).subscribe(x => {
        this.result = x;
      })
  
    }
  }

