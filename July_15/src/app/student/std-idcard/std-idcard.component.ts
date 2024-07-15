import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?: boolean
  route?: string; // Optional route path for the button
}


@Component({
  selector: 'app-std-idcard',
  templateUrl: './std-idcard.component.html',
  styleUrls: ['./std-idcard.component.scss']
})
export class StdIdcardComponent {
  //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  studentpersonalInfo: any = {}
  studentparams: any  =[]
  groupedData: any 


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
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard', selected: true },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments' },
  ];

  //brad crumbs and campus constans for all pages ends here
  breadscrums = [
    {
      title: 'StudentIdCard',
      items: [{ title: 'Student Management' }],
      active: 'StudentIdCard',
    },
  ];



  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.getstudentInfo();
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


  async getstudentInfo() {

    const apiUrl = '/studentapi/Student/getstudentparams'; // Replace with your backend API URL
    const payload = {
      stepid: 1,
      code: this.studentId,
    }
    await this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        this.studentpersonalInfo = response?.data?.previewdata?.studentpersonalInfo
        this.studentparams = response?.data?.previewdata?.studentparams
        const groupedParams = this.studentparams.reduce((acc, param) => {
         
          const { groupname, paramkey, paramval } = param;
          if (!acc[groupname]) {
            acc[groupname] = {};
          }
          acc[groupname][paramkey] = paramval;
          return acc;
        }, {});

   
        this.groupedData = {
          studentInfo: { ...this.studentpersonalInfo },
          ...groupedParams,
          stdId:this.studentId
        };


      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );


  }




  // backToStdProfile() {
  //   this.router.navigate(['/student/studentProfile'], { queryParams: { id: this.studentId } });
  // }
  onButtonClick(button: ButtonData) {

    if (button.route) {
      console.log("J", button)
      this.router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }
}
