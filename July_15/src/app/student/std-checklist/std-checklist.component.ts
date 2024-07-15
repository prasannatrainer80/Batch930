import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';

import { FormBuilder, Validators } from '@angular/forms';


interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}


@Component({
  selector: 'app-std-checklist',
  templateUrl: './std-checklist.component.html',
  styleUrls: ['./std-checklist.component.scss'],
})
export class StdChecklistComponent {
  //brad crumbs and campus constans for all pages starts here

  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  studentId: any;


  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail'},
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist',selected:true  },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments'},
  ];

  //brad crumbs and campus constans for all pages ends here

  breadscrums = [
    {
      title: 'StudentChecklist',
      items: [{ title: 'Student Management' }],
      active: 'StudentChecklist',
    },
  ];

  checked: boolean = false;
  checked1: boolean = true;
  checked2: boolean = false;
  disabled = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}

  documentcheckListFormGroup = this._formBuilder.group({
    docCheckListOffer: ['', Validators.required],
    docType: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params?.['id'];
    });

    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
  }
  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];
      const item = list?.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // backToStdProfile() {
  //   this.router.navigate(['/student/studentProfile'], {
  //     queryParams: { id: this.studentId },
  //   });
  // }
  onButtonClick(button: ButtonData) {
  
    if (button.route) {
      console.log("J",button)
      this.router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }
}
