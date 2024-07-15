import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDashboardComponent } from './offer-dashboard.component';

describe('OfferDashboardComponent', () => {
  let component: OfferDashboardComponent;
  let fixture: ComponentFixture<OfferDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDashboardComponent]
    });
    fixture = TestBed.createComponent(OfferDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
