import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ClientsRoutingModule, 
    ComponentsModule, 
    SharedModule
  ],
})
export class ClientsModule { }
