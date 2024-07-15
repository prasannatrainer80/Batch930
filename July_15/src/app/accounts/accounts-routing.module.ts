import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { StdPaymentComponent } from './std-payment/std-payment.component';

const routes: Routes = [
  {
     path: '', 
     component: AccountsComponent 
    },
    {
      path: 'studentPayment',
      component: StdPaymentComponent
    }
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
