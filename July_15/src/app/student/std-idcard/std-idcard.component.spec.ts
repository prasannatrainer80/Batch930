import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdIdcardComponent } from './std-idcard.component';

describe('StdIdcardComponent', () => {
  let component: StdIdcardComponent;
  let fixture: ComponentFixture<StdIdcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdIdcardComponent]
    });
    fixture = TestBed.createComponent(StdIdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
