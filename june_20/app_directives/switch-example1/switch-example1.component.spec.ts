import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchExample1Component } from './switch-example1.component';

describe('SwitchExample1Component', () => {
  let component: SwitchExample1Component;
  let fixture: ComponentFixture<SwitchExample1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchExample1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchExample1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
