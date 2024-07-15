import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './user-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { ListComponent } from './list/list.component';
import { StatusChangeComponent } from './statuschange/statuschange.component';
import { ManageComponent } from './manage/manage.component';
import { SwitchRoleComponent } from './switchrole/switchrole.component';

@NgModule({
  declarations: [
    ListComponent,
    StatusChangeComponent,
    ManageComponent,
    SwitchRoleComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, UsersRoutingModule, ComponentsModule, SharedModule],
})
export class UsersModule { }
