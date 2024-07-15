import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegTermsConditionsComponent } from './agent-reg-terms-conditions.component';

describe('AgentRegTermsConditionsComponent', () => {
  let component: AgentRegTermsConditionsComponent;
  let fixture: ComponentFixture<AgentRegTermsConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentRegTermsConditionsComponent]
    });
    fixture = TestBed.createComponent(AgentRegTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
