import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { Validators } from 'ngx-editor';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}

@Component({
  selector: 'app-std-defer',
  templateUrl: './std-defer.component.html',
  styleUrls: ['./std-defer.component.scss']
})
export class StdDeferComponent {
  private _formBuilder = inject(FormBuilder)
 
   //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  

  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail'},
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' ,selected:true},
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments'},
  ];



  breadscrums = [
    {
      title: 'StudentDefer',
      items: [{ title: 'Student Management' }],
      active: 'StudentDefer',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute, private router:Router){}

  //? Course Deferral Form Validation

  courseDeferral = this._formBuilder.group({
    studentId: [''],
    name: [''],
    course: [''],
    courseDuration: [''],
    status: [''],
    type:[''],
    reason: [''],
    requestDate: [''],
    deferralStartDate: [''],
    newStartDate: [''],
    deferralFinishDate: [''],
    approvalStatus: [''],
    comments:['']
  })


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
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
      const item = list.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // backToStdProfile() {
  //   this.router.navigate(['/student/studentProfile'], { queryParams: { id: this.studentId } });
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
