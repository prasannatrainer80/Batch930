import { Component } from '@angular/core';

@Component({
  selector: 'app-agent-reg-terms-conditions',
  templateUrl: './agent-reg-terms-conditions.component.html',
  styleUrls: ['./agent-reg-terms-conditions.component.scss']
})
export class AgentRegTermsConditionsComponent {
  isEnableTerm: boolean = false;

  termClick() {
    this.isEnableTerm = true;
  }
}
