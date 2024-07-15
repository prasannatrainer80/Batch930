import { Page404Component } from './authentication/page404/page404.component';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'public', component: AuthLayoutComponent,
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'authentication', component: AuthLayoutComponent,
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'student',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },
      { path: 'offer', 
        canActivate: [AuthGuard],
        loadChildren: () => 
          import('./offer/offer.module').then(m => m.OfferModule) },
      {
        path: 'admin', canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'users', canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'clients',canActivate: [AuthGuard],
        loadChildren: () =>
          import('./clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'adminapp', canActivate: [AuthGuard],
        loadChildren: () => import('./dynamic/dynamic.module').then((m) => m.DynamicModule),
      },
      {
        path: 'auth',canActivate: [AuthGuard],
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
      {
        path: 'platform',canActivate: [AuthGuard],
        loadChildren: () =>
          import('./platform/platform.module').then((m) => m.PlatformModule),
      },
      { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
     
      {
        /* always keep this route as last item */
        path: ':module', canActivate: [AuthGuard],
        loadChildren: () => import('./dynamic/dynamic.module').then((m) => m.DynamicModule),
      },
     
    ],
  },
  
  
 
 
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
