import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step7Component } from './step7.component';

describe('Step7Component', () => {
  let component: Step7Component;
  let fixture: ComponentFixture<Step7Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Step7Component]
    });
    fixture = TestBed.createComponent(Step7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
