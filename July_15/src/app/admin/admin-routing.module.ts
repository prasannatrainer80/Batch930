import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollFeeComponent} from '../admin/enroll-fee/enroll-fee.component';
import { ResultGradesComponent } from './result-grades/result-grades.component';
import { SIDFormatComponent } from './sidformat/sidformat.component';
import { CourseSubjectsComponent } from './course-subjects/course-subjects.component';
import { SpecialisationsComponent } from './specialisations/specialisations.component';
import { VetIntakesComponent } from './intakes/vet-intakes/vet-intakes.component';
import { ElicosIntakesComponent } from './intakes/elicos-intakes/elicos-intakes.component';
import { CommissionComponent } from './agents/commission/commission.component';
import { SemdivisionComponent } from './timetable/semdivision/semdivision.component';
import { CoursecalendarComponent } from './timetable/coursecalendar/coursecalendar.component';
import { ManageclassComponent } from './timetable/manageclass/manageclass.component';
import { ManageBreaksComponent } from './timetable/manageclass/managebreaks/managebreaks.component';
import { CoursesFeeComponent } from './courses-fee/courses-fee.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'enrollfees',
    component:EnrollFeeComponent
  },
  {
    path: 'resultgrades',
    component:ResultGradesComponent
  },
  {
    path: 'sidformat',
    component:SIDFormatComponent
  },
  {
    path: 'coursesubjects',
    component: CourseSubjectsComponent
  },
  {
    path: 'course/fee',
    component: CoursesFeeComponent
  },
  {
    path: 'specialisations',
    component:SpecialisationsComponent
  },
  {
    path: 'vetintakes',
    component: VetIntakesComponent
  },
  {
    path: 'elicosintakes',
    component: ElicosIntakesComponent
  },
  {
    path: 'agentcommission',
    component: CommissionComponent
  },
  
  {
    path: 'semester',
    component: SemdivisionComponent
  },
  {
    path: 'studyperiods',
    component: CoursecalendarComponent
  },
  {
    path: 'manageclass',
    component: ManageclassComponent
  },
  {
    path: 'managebreak',
    component: ManageBreaksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
