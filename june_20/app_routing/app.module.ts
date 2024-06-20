import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { CalcComponent } from './calc/calc.component';
import { NameComponent } from './name/name.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes : Routes = 
[
  {path:'',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path:'menu',component:MenuComponent, children : 
    [
      {path:'first',component:FirstComponent,outlet:'sonix'},
      {path:'second',component:SecondComponent,outlet:'sonix'},
      {path:'third',component:ThirdComponent,outlet:'sonix'},
      {path:'name',component:NameComponent,outlet:'sonix'},
      {path:'calc',component:CalcComponent,outlet:'sonix'},       
    ]
  },
]
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    CalcComponent,
    NameComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
