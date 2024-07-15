import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { StdProfileComponent } from './std-profile/std-profile.component';
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

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'manage-student',
    component: ManageStudentComponent
  },
  {
    path: 'homework',
    component: HomeworkComponent,
  },
  {
    path: 'studentProfile',
    component: StdProfileComponent,
  },
  {
    path: 'stdPayments',
    component: StdPaymentsComponent
  },
  {
    path:'addStudent',
    component: AddStudentComponent
  },
  {
    path:'regStartWithChoice',
    component: StdRegStartChoiceComponent
  },
  {
    path: 'stdEmail',
    component: StdEmailComponent
  },
  {
    path: 'stdLetter',
    component: StdLetterComponent
  },
  {
    path: 'stdCourse',
    component: StdCourseComponent
  },
  {
    path: 'stdChecklist',
    component: StdChecklistComponent
  },
  {
    path: 'stdResult',
    component: StdResultComponent
  },
  {
    path: 'stdDefer',
    component: StdDeferComponent
  },
  {
    path: 'stdEnglishtest',
    component: StdEnglishtestComponent
  },
  {
    path: 'stdIdcard',
    component: StdIdcardComponent
  },
  {
    path: 'stdApi',
    component: StdapiComponent
  },
  {
    path: 'stdAttendance',
    component: StdAttendanceComponent
  },
  {
    path: 'leave-request',
    component: LeaveRequestComponent,
  },
  {
    path: 'timetable',
    component: TimetableComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'course-registration/:code',
    component: CourseRegistrationComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
