import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDashboardComponent } from './marketing-dashboard.component';

describe('MarketingDashboardComponent', () => {
  let component: MarketingDashboardComponent;
  let fixture: ComponentFixture<MarketingDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketingDashboardComponent]
    });
    fixture = TestBed.createComponent(MarketingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
