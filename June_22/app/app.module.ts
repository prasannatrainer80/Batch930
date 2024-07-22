import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerDashBoardComponent } from './customer-dash-board/customer-dash-board.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerWalletShowComponent } from './customer-wallet-show/customer-wallet-show.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { CustomerPendingOrdersComponent } from './customer-pending-orders/customer-pending-orders.component';

const appRoutes : Routes = [
  {path:'',component:CustomerLoginComponent},
  {path:'customerDashBoard',component:CustomerDashBoardComponent,
    children : 
    [
      {path:'customerInfo',component:CustomerInfoComponent,outlet:'sonix'},
      {path:'customerWalletShow',component:CustomerWalletShowComponent,outlet:'sonix'},
      {path:'customerOrders',component:CustomerOrdersComponent,outlet:'sonix'},
      {path:'customerPendingOrders',component:CustomerPendingOrdersComponent,outlet:'sonix'},
      
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerDashBoardComponent,
    CustomerInfoComponent,
    CustomerWalletShowComponent,
    CustomerOrdersComponent,
    CustomerPendingOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
