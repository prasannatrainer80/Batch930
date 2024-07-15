import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdEnglishtestComponent } from './std-englishtest.component';

describe('StdEnglishtestComponent', () => {
  let component: StdEnglishtestComponent;
  let fixture: ComponentFixture<StdEnglishtestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdEnglishtestComponent]
    });
    fixture = TestBed.createComponent(StdEnglishtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
