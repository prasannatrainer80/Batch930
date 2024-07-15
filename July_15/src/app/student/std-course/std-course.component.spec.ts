import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdCourseComponent } from './std-course.component';

describe('StdCourseComponent', () => {
  let component: StdCourseComponent;
  let fixture: ComponentFixture<StdCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdCourseComponent]
    });
    fixture = TestBed.createComponent(StdCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
