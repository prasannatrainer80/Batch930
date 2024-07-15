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
  selector: 'app-std-course',
  templateUrl: './std-course.component.html',
  styleUrls: ['./std-course.component.scss'],
})
export class StdCourseComponent {

  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail'},
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse',selected:true  },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments'},
  ];

  breadscrums = [
    {
      title: 'StudentCourse',
      items: [{ title: 'Student Management' }],
      active: 'StudentCourse',
    },
  ];

  completeStudentData: any;
  studentappliedcoursesList:any= [];
  loading = false;
  
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  studentId: any;

  


  
  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);
   constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
  
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.getCoursesbylist()
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
this.loadData()

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



  async getCoursesbylist() {
    const studentappliedcoursesList_URL =
      '/studentapi/Student/studentappliedcoursesList';
    const payload = {
      code: this.studentId,
    };
    await this.apiService
      .post(studentappliedcoursesList_URL, payload)
      .subscribe({
        next: (res: any) => {
        
          const studentappliedcoursesList = res?.data?.list;
          this.studentappliedcoursesList = studentappliedcoursesList;

          console.log(res.data.list);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
