import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosHeDashboardComponent } from './dos-he-dashboard.component';

describe('DosHeDashboardComponent', () => {
  let component: DosHeDashboardComponent;
  let fixture: ComponentFixture<DosHeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosHeDashboardComponent]
    });
    fixture = TestBed.createComponent(DosHeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
