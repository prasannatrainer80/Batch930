import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformRoutingModule } from './platform-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { EmailTmplsComponent } from './email-tmpls/email-tmpls.component';
import { TmplAddComponent } from './email-tmpls/tmpl-add/tmpl-add.component';
import { TmplEditComponent } from './email-tmpls/tmpl-edit/tmpl-edit.component';
import { NgxEditorModule } from 'ngx-editor';
import { TmplTypeAddComponent } from './email-tmpls/tmpl-type-add/tmpl-type-add.component'
@NgModule({
  declarations: [
    EmailTmplsComponent,
    TmplAddComponent,
    TmplEditComponent,
    TmplTypeAddComponent
  ],
  imports: [
    CommonModule, 
    NgxEditorModule,
    FormsModule, 
    ReactiveFormsModule, 
    PlatformRoutingModule, 
    ComponentsModule, 
    SharedModule
  ],
})
export class PlatformModule { }
