import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdApplicationComponent } from './std-application.component';

describe('StdApplicationComponent', () => {
  let component: StdApplicationComponent;
  let fixture: ComponentFixture<StdApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdApplicationComponent]
    });
    fixture = TestBed.createComponent(StdApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
