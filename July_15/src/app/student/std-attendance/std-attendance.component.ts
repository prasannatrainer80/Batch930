import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}

@Component({
  selector: 'app-std-attendance',
  templateUrl: './std-attendance.component.html',
  styleUrls: ['./std-attendance.component.scss'],
})
export class StdAttendanceComponent {
  //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;


  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);



  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail' },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard',selected:false },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' ,selected:true},
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments'},
  ];

  //brad crumbs and campus constans for all pages ends here

  breadscrums = [
    {
      title: 'StudentAttendance',
      items: [{ title: 'Student Management' }],
      active: 'StudentAttendance',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

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
