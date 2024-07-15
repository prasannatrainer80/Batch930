import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '@shared/components/components.module';
import { PublicAgentsComponent } from './agent-module/agents/agents.component';
import { PublicCoursesComponent } from './courses/courses.component';
import { StdApplicationComponent } from './student-application/std-application/std-application.component';
import { Step1Component } from './student-application/step1/step1.component';
import { Step2Component } from './student-application/step2/step2.component';
import { Step3Component } from './student-application/step3/step3.component';
import { Step4Component } from './student-application/step4/step4.component';
import { Step5Component } from './student-application/step5/step5.component';
import { Step6Component } from './student-application/step6/step6.component';
import { Step7Component } from './student-application/step7/step7.component';
import { AgentRegistrationComponent } from './agent-module/agent-registration/agent-registration.component';
import { AgentRegTermsConditionsComponent } from './agent-module/agent-reg-terms-conditions/agent-reg-terms-conditions.component';
@NgModule({
  declarations: [
    PublicCoursesComponent,
    PublicAgentsComponent,
    StdApplicationComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    AgentRegistrationComponent,
    AgentRegTermsConditionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class PublicModule { }
