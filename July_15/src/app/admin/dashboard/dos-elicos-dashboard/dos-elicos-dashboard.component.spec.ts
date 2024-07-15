import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosElicosDashboardComponent } from './dos-elicos-dashboard.component';

describe('DosElicosDashboardComponent', () => {
  let component: DosElicosDashboardComponent;
  let fixture: ComponentFixture<DosElicosDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosElicosDashboardComponent]
    });
    fixture = TestBed.createComponent(DosElicosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
