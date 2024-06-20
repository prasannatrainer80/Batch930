import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchExample2Component } from './switch-example2.component';

describe('SwitchExample2Component', () => {
  let component: SwitchExample2Component;
  let fixture: ComponentFixture<SwitchExample2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchExample2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchExample2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
