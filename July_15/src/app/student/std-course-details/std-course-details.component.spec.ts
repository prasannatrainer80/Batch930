import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdCourseDetailsComponent } from './std-course-details.component';

describe('StdCourseDetailsComponent', () => {
  let component: StdCourseDetailsComponent;
  let fixture: ComponentFixture<StdCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(StdCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
