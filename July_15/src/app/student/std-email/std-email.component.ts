import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Validators } from 'ngx-editor';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}

@Component({
  selector: 'app-std-email',
  templateUrl: './std-email.component.html',
  styleUrls: ['./std-email.component.scss']
})
export class StdEmailComponent implements OnInit {
   //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;


  studentData: any = {};
  
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail',selected:true },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
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
      title: 'StudentEmail',
      items: [{ title: 'Student Management' }],
      active: 'StudentEmail',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "12rem",
    minHeight: "10rem",
    placeholder: "Enter Product Complete Description here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Poppins",
  };



  constructor(private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.getStudentData();
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


   //! Offer Management Send Email
   private _formBuilder = inject(FormBuilder)
  
   sendEmail = this._formBuilder.group({
     
     tmplcode: [''],
     mfrom: [''],
     mto: [''],
     mcc: [''],
     mbcc: [''],
     msub: [''],
     mbody: [''],
     batchid:['']
   })
  
  async getStudentData(){
    const url = '/studentapi/Student/GetStudentsListByKey';
    const payload = {
        "key": "All",
        "byval": this.studentId
    };
    await this.apiService.post(url, payload).subscribe((response: any) => {
      this.studentData = response.data.list[0];
      console.log("student data",response);
      
    });
  }


   sendMail(){
     console.log(this.sendEmail.value)
    const url = '/studentapi/Student/InsertEmailData';
    const payload = {
      clientid: this.clientId,
      refcode: this.studentId,
      utcTime: new Date().toLocaleDateString(),
      ...this.sendEmail.value
    };
    console.log("insert Email payload",payload);
    

    this.apiService.post(url, payload).subscribe((response: any) => {
      console.log("send Mail ", response);
      
    });
   }

}
