import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserShowComponent } from './user-show/user-show.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerShowComponent } from './customer-show/customer-show.component';
import { MenuShowComponent } from './menu-show/menu-show.component';
import { MenuSearchComponent } from './menu-search/menu-search.component';

const appRoutes : Routes = [
  {path:'',component:LoginComponent},
  {path:'menu',component:MenuComponent,children :
    [
      {path:'userShow',component:UserShowComponent,outlet:'sonix'},
      {path:'userSearch',component:SearchUserComponent,outlet:'sonix'},
      {path:'customerShow',component:CustomerShowComponent,outlet:'sonix'},
      {path:'menuShow',component:MenuShowComponent,outlet:'sonix'},
      {path:'menuSearch',component:MenuSearchComponent,outlet:'sonix'},
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    UserShowComponent,
    SearchUserComponent,
    MenuComponent,
    LoginComponent,
    CustomerShowComponent,
    MenuShowComponent,
    MenuSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
