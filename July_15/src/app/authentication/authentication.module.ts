import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockedComponent } from './locked/locked.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';

import { ComponentsModule } from '@shared/components/components.module';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    LockedComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ResetpwdComponent,
    ActivateUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class AuthenticationModule {}
