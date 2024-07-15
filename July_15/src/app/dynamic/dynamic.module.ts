import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { DynamicRoutingModule } from './dynamic-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListComponent } from './list/list.component';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';
import { DynamicModalComponent } from './dynamic-modal/dynamic-modal.component';
import { DynamicStatusComponent } from './dynamic-status/dynamic-status.component';
import { CustomDirective } from '@shared/directives/custom.directive';

@NgModule({
  declarations: [
    ListComponent,
    DynamicPageComponent,
    DynamicModalComponent,
    DynamicStatusComponent,
    CustomDirective
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    DynamicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgxDatatableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DynamicModule { }
