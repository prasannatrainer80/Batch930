import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Condition1Component } from './condition1/condition1.component';
import { Condition2Component } from './condition2/condition2.component';
import { SwitchExample1Component } from './switch-example1/switch-example1.component';
import { SwitchExample2Component } from './switch-example2/switch-example2.component';

@NgModule({
  declarations: [
    AppComponent,
    Condition1Component,
    Condition2Component,
    SwitchExample1Component,
    SwitchExample2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
