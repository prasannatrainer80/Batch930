import { Component } from '@angular/core';
import { Wallet } from '../wallet';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-customer-wallet-show',
  templateUrl: './customer-wallet-show.component.html',
  styleUrl: './customer-wallet-show.component.css'
})
export class CustomerWalletShowComponent {

  custId : number;
  wallets : Wallet[];

  constructor(private _walletService : WalletService) {
    this.custId = parseInt(localStorage.getItem("cid"));
     this._walletService.showCustomerWallet(this.custId).subscribe(x => {
      this.wallets = x;
    })
  }
}
