import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosDashboardComponent } from './dos-dashboard.component';

describe('DosDashboardComponent', () => {
  let component: DosDashboardComponent;
  let fixture: ComponentFixture<DosDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosDashboardComponent]
    });
    fixture = TestBed.createComponent(DosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
