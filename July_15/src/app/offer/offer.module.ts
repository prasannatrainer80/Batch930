import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { FeeScheduleComponent } from './fee-schedule/fee-schedule.component';


@NgModule({
  declarations: [
    OfferComponent,
    FeeScheduleComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    SharedModule
  ]
})
export class OfferModule { }
