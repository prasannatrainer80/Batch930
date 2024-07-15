import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-registration',
  templateUrl: './agent-registration.component.html',
  styleUrls: ['./agent-registration.component.scss']
})
export class AgentRegistrationComponent {
  private _formBuilder = inject(FormBuilder)

  agentApplicationDtls = this._formBuilder.group({
    agencyName: ['',Validators.required],
    otherName: [''],
    contactPerson: ['',Validators.required],
    primaryEmail: ['',Validators.required],
    alternateEmail: [''],
    website: [''],
    tel: ['',Validators.required],
    fax: [''],
    mobile1: [''],
    mobile2: [''],
    numOfEmployees: [''],
    agentOrCompayNotes:['']
  })
  officeAddress = this._formBuilder.group({
    country: [''],
    address: ['', Validators.required],
    cityOrTownOrSuburb: ['', Validators.required],
    stateOrProvince: [''],
    postcode: ['', Validators.required],
    acn: [''],
    abn:['']
  })
  targetRecruitmentCntry = this._formBuilder.group({
    primaryCountry: ['', Validators.required],
    secoundaryCountry:['']
  })

}
