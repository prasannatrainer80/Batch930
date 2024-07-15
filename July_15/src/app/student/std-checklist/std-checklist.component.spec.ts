import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdChecklistComponent } from './std-checklist.component';

describe('StdChecklistComponent', () => {
  let component: StdChecklistComponent;
  let fixture: ComponentFixture<StdChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdChecklistComponent]
    });
    fixture = TestBed.createComponent(StdChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
