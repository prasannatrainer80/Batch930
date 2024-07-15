import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeScheduleComponent } from './fee-schedule.component';

describe('FeeScheduleComponent', () => {
  let component: FeeScheduleComponent;
  let fixture: ComponentFixture<FeeScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeScheduleComponent]
    });
    fixture = TestBed.createComponent(FeeScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
