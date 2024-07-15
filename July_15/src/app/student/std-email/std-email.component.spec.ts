import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdEmailComponent } from './std-email.component';

describe('StdEmailComponent', () => {
  let component: StdEmailComponent;
  let fixture: ComponentFixture<StdEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdEmailComponent]
    });
    fixture = TestBed.createComponent(StdEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
