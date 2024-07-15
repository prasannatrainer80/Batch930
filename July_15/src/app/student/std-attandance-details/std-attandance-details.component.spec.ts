import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdAttandanceDetailsComponent } from './std-attandance-details.component';

describe('StdAttandanceDetailsComponent', () => {
  let component: StdAttandanceDetailsComponent;
  let fixture: ComponentFixture<StdAttandanceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdAttandanceDetailsComponent]
    });
    fixture = TestBed.createComponent(StdAttandanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
