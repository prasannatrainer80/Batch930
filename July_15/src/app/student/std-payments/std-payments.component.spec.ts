import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdPaymentsComponent } from './std-payments.component';

describe('StdPaymentsComponent', () => {
  let component: StdPaymentsComponent;
  let fixture: ComponentFixture<StdPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdPaymentsComponent]
    });
    fixture = TestBed.createComponent(StdPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
