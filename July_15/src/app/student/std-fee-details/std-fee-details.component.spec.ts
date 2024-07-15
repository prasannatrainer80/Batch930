import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdFeeDetailsComponent } from './std-fee-details.component';

describe('StdFeeDetailsComponent', () => {
  let component: StdFeeDetailsComponent;
  let fixture: ComponentFixture<StdFeeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdFeeDetailsComponent]
    });
    fixture = TestBed.createComponent(StdFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
