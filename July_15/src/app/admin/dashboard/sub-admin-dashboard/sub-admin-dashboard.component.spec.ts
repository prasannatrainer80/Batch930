import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminDashboardComponent } from './sub-admin-dashboard.component';

describe('SubAdminDashboardComponent', () => {
  let component: SubAdminDashboardComponent;
  let fixture: ComponentFixture<SubAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(SubAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
