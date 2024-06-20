import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Condition2Component } from './condition2.component';

describe('Condition2Component', () => {
  let component: Condition2Component;
  let fixture: ComponentFixture<Condition2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Condition2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Condition2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
