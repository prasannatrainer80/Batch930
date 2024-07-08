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

const appRoutes : Routes = [
  {path:'',component:CustomerLoginComponent},
  {path:'customerDashBoard',component:CustomerDashBoardComponent,
    children : 
    [
      {path:'customerInfo',component:CustomerInfoComponent,outlet:'sonix'}
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    CustomerLoginComponent,
    CustomerDashBoardComponent,
    CustomerInfoComponent
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
