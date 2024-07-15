import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { DeleteDialogComponent as leaveDeleteComonent } from './leave-request/dialogs/delete/delete.component';
import { FormDialogComponent } from './leave-request/dialogs/form-dialog/form-dialog.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';

import { HomeworkService } from './homework/homework.service';
import { LeaveRequestService as stdLeaveReqService } from './leave-request/leave-request.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { StdProfileComponent } from './std-profile/std-profile.component';
import { StdCourseDetailsComponent } from './std-course-details/std-course-details.component';
import { StdCourseTimeTableDetailsComponent } from './std-course-time-table-details/std-course-time-table-details.component';
import { StdAttandanceDetailsComponent } from './std-attandance-details/std-attandance-details.component';
import { StdFeeDetailsComponent } from './std-fee-details/std-fee-details.component';
import { StdPaymentsComponent } from './std-payments/std-payments.component';
import { StdEmailComponent } from './std-email/std-email.component';
import { StdLetterComponent } from './std-letter/std-letter.component';
import { StdCourseComponent } from './std-course/std-course.component';
import { StdChecklistComponent } from './std-checklist/std-checklist.component';
import { StdResultComponent } from './std-result/std-result.component';
import { StdDeferComponent } from './std-defer/std-defer.component';
import { StdEnglishtestComponent } from './std-englishtest/std-englishtest.component';
import { StdIdcardComponent } from './std-idcard/std-idcard.component';
import { StdAttendanceComponent } from './std-attendance/std-attendance.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StdRegStartChoiceComponent } from './std-reg-start-choice/std-reg-start-choice.component';
import { StdapiComponent } from './stdapi/stdapi.component';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { OfferPreviewComponent } from './offer-preview/offer-preview.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeworkComponent,
    LeaveRequestComponent,
    leaveDeleteComonent,
    FormDialogComponent,
    TimetableComponent,
    SettingsComponent,
    CourseRegistrationComponent,
    ManageStudentComponent,
    StdProfileComponent,
    StdCourseDetailsComponent,
    StdCourseTimeTableDetailsComponent,
    StdAttandanceDetailsComponent,
    StdFeeDetailsComponent,
    StdPaymentsComponent,
    StdEmailComponent,
    StdLetterComponent,
    StdCourseComponent,
    StdChecklistComponent,
    StdResultComponent,
    StdDeferComponent,
    StdEnglishtestComponent,
    StdIdcardComponent,
    StdAttendanceComponent,
    AddStudentComponent,
    StdRegStartChoiceComponent,
    StdapiComponent,
    OfferLetterComponent,
    OfferPreviewComponent
  ],
  imports: [
    AngularEditorModule,
    CommonModule,
    StudentRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgApexchartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
    
  ],
  providers: [HomeworkService, stdLeaveReqService],
})
export class StudentModule {}
