import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdCourseTimeTableDetailsComponent } from './std-course-time-table-details.component';

describe('StdCourseTimeTableDetailsComponent', () => {
  let component: StdCourseTimeTableDetailsComponent;
  let fixture: ComponentFixture<StdCourseTimeTableDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdCourseTimeTableDetailsComponent]
    });
    fixture = TestBed.createComponent(StdCourseTimeTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
