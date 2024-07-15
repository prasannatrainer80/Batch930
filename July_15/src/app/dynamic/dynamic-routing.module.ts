import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DynamicPageComponent } from './dynamic-page/dynamic-page.component';

const routes: Routes = [

  { path: 'list/:module', component: ListComponent },
  { path: 'list', component: ListComponent },
  
  { path: 'view/:code', component: DynamicPageComponent },
  { path: 'edit/:code', component: DynamicPageComponent },
  { path: 'add', component: DynamicPageComponent },

  { path: '**', component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DynamicRoutingModule { }
