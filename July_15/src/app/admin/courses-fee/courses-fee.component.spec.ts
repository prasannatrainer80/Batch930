import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFeeComponent } from './courses-fee.component';

describe('CoursesFeeComponent', () => {
  let component: CoursesFeeComponent;
  let fixture: ComponentFixture<CoursesFeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesFeeComponent]
    });
    fixture = TestBed.createComponent(CoursesFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
