import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdPaymentComponent } from './std-payment.component';

describe('StdPaymentComponent', () => {
  let component: StdPaymentComponent;
  let fixture: ComponentFixture<StdPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdPaymentComponent]
    });
    fixture = TestBed.createComponent(StdPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
