import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicAgentsComponent } from './agent-module/agents/agents.component';
import { PublicCoursesComponent } from './courses/courses.component';
import { PublicContactComponent } from './contact/contact.component';
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
const routes: Routes = [
  {
    path: 'agents',
    component: PublicAgentsComponent
  },
  {
    path: 'agent-registration',
    component: AgentRegistrationComponent
  },
  {
    path: 'agent-terms',
    component: AgentRegTermsConditionsComponent
  },
  {
    path: 'courses',
    component: PublicCoursesComponent,
  },
  {
    path: 'stdApplication',
    component: StdApplicationComponent
  },
  {
    path: 'step1',
    component: Step1Component
  },
  {
    path: 'step2',
    component: Step2Component
  },
  {
    path: 'step3',
    component: Step3Component
  },
  {
    path: 'step4',
    component: Step4Component
  },
  {
    path: 'step5',
    component: Step5Component
  },
  {
    path: 'step6',
    component: Step6Component
  },
  {
    path: 'step7',
    component: Step7Component
  },
  {
    path: 'contact',
    component: PublicContactComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
