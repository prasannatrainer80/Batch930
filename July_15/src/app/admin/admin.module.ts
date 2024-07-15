import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '@shared/components/components.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';

import { EnrollFeeComponent } from './enroll-fee/enroll-fee.component';
import { EFEditComponent } from './enroll-fee/edit/efedit.component';
import { EFAddComponent } from './enroll-fee/add/efadd.component';

import { ResultGradesComponent } from './result-grades/result-grades.component';
import { RGDetailsComponent } from './result-grades/rgdetails/rgdetails.component';
import { RgAddComponent } from './result-grades/rg-add/rg-add.component';
import { RgEditComponent } from './result-grades/rg-edit/rg-edit.component';
import { SIDFormatComponent } from './sidformat/sidformat.component';
import { CourseSubjectsComponent } from './course-subjects/course-subjects.component';
import { CsAddComponent } from './course-subjects/cs-add/cs-add.component';
import { CsEditComponent } from './course-subjects/cs-edit/cs-edit.component';

import { SpecialisationsComponent } from './specialisations/specialisations.component';
import { SpeclSubsComponent } from './specialisations/specl-subs/specl-subs.component';
import { SpeclAddComponent } from './specialisations/specl-add/specl-add.component';

import { VetIntakesComponent } from './intakes/vet-intakes/vet-intakes.component';
import { ElicosIntakesComponent } from './intakes/elicos-intakes/elicos-intakes.component';
import { VetIntakeAddComponent } from './intakes/vet-intakes/vet-intake-add/vet-intake-add.component';
import { VetIntakeEditComponent } from './intakes/vet-intakes/vet-intake-edit/vet-intake-edit.component';
import { ElicosIntakeAddComponent } from './intakes/elicos-intakes/elicos-intake-add/elicos-intake-add.component';
import { ElicosIntakeEditComponent } from './intakes/elicos-intakes/elicos-intake-edit/elicos-intake-edit.component';
import { CommissionComponent } from './agents/commission/commission.component';
import { AddcommissionComponent } from './agents/commission/addcommission/addcommission.component';
import { EditcommissionComponent } from './agents/commission/editcommission/editcommission.component';
import { ViewlogComponent } from './agents/commission/viewlog/viewlog.component';
import { SemdivisionComponent } from './timetable/semdivision/semdivision.component';
import { AdddivisionComponent } from './timetable/semdivision/adddivision/adddivision.component';
import { CoursecalendarComponent } from './timetable/coursecalendar/coursecalendar.component';
import { AddcoursecalendarComponent } from './timetable/coursecalendar/addcoursecalendar/addcoursecalendar.component';
import { ManageclassComponent } from './timetable/manageclass/manageclass.component';
import { SetupclassComponent } from './timetable/manageclass/setupclass/setupclass.component';
import { EditclassComponent } from './timetable/manageclass/editclass/editclass.component';
import { ManageBreaksComponent } from './timetable/manageclass/managebreaks/managebreaks.component';
import { AddBreakComponent } from './timetable/manageclass/managebreaks/addbreak/addbreak.component';
import { EditBreakComponent } from './timetable/manageclass/managebreaks/editbreak/editbreak.component';
import { CoursesFeeComponent } from './courses-fee/courses-fee.component';



@NgModule({
  declarations: [
    EnrollFeeComponent,
    EFAddComponent,
    EFEditComponent,

    ResultGradesComponent,
    RGDetailsComponent,
    RgAddComponent,
    RgEditComponent,

    SIDFormatComponent,
    CourseSubjectsComponent,
    CsAddComponent,
    CsEditComponent,

    SpecialisationsComponent,
    SpeclAddComponent,
    SpeclSubsComponent,
    VetIntakesComponent,
    ElicosIntakesComponent,
    VetIntakeAddComponent,
    VetIntakeEditComponent,
    ElicosIntakeAddComponent,
    ElicosIntakeEditComponent,
    CommissionComponent,
    AddcommissionComponent,
    EditcommissionComponent,
    ViewlogComponent,
    SemdivisionComponent,
    AdddivisionComponent,
    CoursecalendarComponent,
    AddcoursecalendarComponent,
    ManageclassComponent,
    SetupclassComponent,
    EditclassComponent,
    ManageBreaksComponent,
    AddBreakComponent,
    EditBreakComponent,
    CoursesFeeComponent,
   
  ],
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule, AdminRoutingModule, ComponentsModule, SharedModule],
})
export class AdminModule { }
