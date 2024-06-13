import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDemoComponent } from './name-demo.component';

describe('NameDemoComponent', () => {
  let component: NameDemoComponent;
  let fixture: ComponentFixture<NameDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NameDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
