import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { EmployFormComponent } from './employ-form/employ-form.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { StudentFormComponent } from './student-form/student-form.component';

const appRoutes : Routes = [
  {path:'',component:LoginFormComponent},
  {path:'menu',component:MenuFormComponent},
  {path:'menu',component:MenuFormComponent, children : [
    {path:'employForm',component:EmployFormComponent,outlet:'sonix'}
  ]}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    EmployFormComponent,
    MenuFormComponent,
    CustomerFormComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
