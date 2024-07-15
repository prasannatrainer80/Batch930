import { Component, OnInit, inject } from '@angular/core';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '@core/service/auth.service';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { APICallService } from '@core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StdRegStartChoiceComponent } from '../std-reg-start-choice/std-reg-start-choice.component';
import { Router } from '@angular/router';


interface StartOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AddStudentComponent implements OnInit {
  breadscrums = [
    {
      title: 'StudentRegistration',
      items: [{ title: 'Student Management' }],
      active: 'Student Registration',
    },
  ];
  constructor() {}

  clientId: any;
  campusName: string = '';
  campusId: any;
  apiService = inject(APICallService);
  authService = inject(AuthService);


  startOptions: StartOption[] = [
    { value: 1, label: 'New Application' },
    { value: 2, label: 'Saved Online Application' }
  ];
  selectedOption: number = 1;
  ApplicationRefID: string = '';
  router = inject(Router)
  ngOnInit(): void {
    
   this.loadData();
    this.clientId = this.authService.currentUserValue.clientId;
   }
  onOptionChange(value: number) {
    this.selectedOption = value;
  }
 async onStartClick() {
    if(this.selectedOption === 1){
      this.router.navigate(['/student/regStartWithChoice'])
    }
   if(this.selectedOption === 2 && this.ApplicationRefID){
    const url = '/studentapi/Student/Studentsappstatus';
    const payload = {
      byval: this.ApplicationRefID
    };
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'][0];
     this.router.navigate(['/student/regStartWithChoice'], {queryParams: {appRefId: list.code, appstatus: list.appstatus}}) 
    }catch (err) {
      console.log(err);
    }
     
    }
   
  }
  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];
   
      const item = list.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

}
