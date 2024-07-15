import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SubAdminDashboardComponent } from './sub-admin-dashboard/sub-admin-dashboard.component';
import { ClientAdminDashboardComponent } from './client-admin-dashboard/client-admin-dashboard.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { ItDashboardComponent } from './it-dashboard/it-dashboard.component';
import { MarketingDashboardComponent } from './marketing-dashboard/marketing-dashboard.component';
import { OfferDashboardComponent } from './offer-dashboard/offer-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { DosDashboardComponent } from './dos-dashboard/dos-dashboard.component';
import { DosHeDashboardComponent } from './dos-he-dashboard/dos-he-dashboard.component';
import { DosElicosDashboardComponent } from './dos-elicos-dashboard/dos-elicos-dashboard.component';

@NgModule({
  declarations: [MainComponent, Dashboard2Component, AdminDashboardComponent, SubAdminDashboardComponent, ClientAdminDashboardComponent, AccountsDashboardComponent, ItDashboardComponent, MarketingDashboardComponent, OfferDashboardComponent, TeacherDashboardComponent, DosDashboardComponent, DosHeDashboardComponent, DosElicosDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class DashboardModule {}
