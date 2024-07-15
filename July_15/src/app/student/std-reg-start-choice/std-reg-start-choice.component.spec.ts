import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdRegStartChoiceComponent } from './std-reg-start-choice.component';

describe('StdRegStartChoiceComponent', () => {
  let component: StdRegStartChoiceComponent;
  let fixture: ComponentFixture<StdRegStartChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdRegStartChoiceComponent]
    });
    fixture = TestBed.createComponent(StdRegStartChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
