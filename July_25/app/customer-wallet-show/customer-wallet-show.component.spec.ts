import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWalletShowComponent } from './customer-wallet-show.component';

describe('CustomerWalletShowComponent', () => {
  let component: CustomerWalletShowComponent;
  let fixture: ComponentFixture<CustomerWalletShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerWalletShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerWalletShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
