import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './../authentication/page404/page404.component';
import { EmailTmplsComponent } from './email-tmpls/email-tmpls.component';
import { TmplAddComponent } from './email-tmpls/tmpl-add/tmpl-add.component';
import { TmplEditComponent } from './email-tmpls/tmpl-edit/tmpl-edit.component';
const routes: Routes = [
  { path: 'emailtmpls/list', component: EmailTmplsComponent },
  { path: 'emailtmpls/add', component: TmplAddComponent },
  { path: 'emailtmpls/edit/:code', component: TmplEditComponent },

  { path: '**', component: Page404Component },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
