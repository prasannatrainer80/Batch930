import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdDeferComponent } from './std-defer.component';

describe('StdDeferComponent', () => {
  let component: StdDeferComponent;
  let fixture: ComponentFixture<StdDeferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdDeferComponent]
    });
    fixture = TestBed.createComponent(StdDeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
