import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdResultComponent } from './std-result.component';

describe('StdResultComponent', () => {
  let component: StdResultComponent;
  let fixture: ComponentFixture<StdResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdResultComponent]
    });
    fixture = TestBed.createComponent(StdResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
