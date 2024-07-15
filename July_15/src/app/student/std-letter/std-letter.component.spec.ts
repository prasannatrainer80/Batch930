import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdLetterComponent } from './std-letter.component';

describe('StdLetterComponent', () => {
  let component: StdLetterComponent;
  let fixture: ComponentFixture<StdLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdLetterComponent]
    });
    fixture = TestBed.createComponent(StdLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
