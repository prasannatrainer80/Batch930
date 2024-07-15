import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from "@kolkov/angular-editor";

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}

@Component({
  selector: 'app-std-letter',
  templateUrl: './std-letter.component.html',
  styleUrls: ['./std-letter.component.scss']
})
export class StdLetterComponent {

  //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;

  roleId: any;
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail' },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter',selected:true },
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
      title: 'StudentLetter',
      items: [{ title: 'Student Management' }],
      active: 'StudentLetter',
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
  
   sendLetter = this._formBuilder.group({
     courseAppliedList: [''],
     agentName: [''],
     studentName: [''],
     from: [''],
     sendTo: [''],
     to: [''],
     cc: [''],
     templateType: [''],
     emailTemplate:[''],
     subject: ['', Validators.required],
     body: ['', Validators.required],
     mbody: [""],
     
   })

   SendLetter(){
    console.log(this.sendLetter.value)
   }
}
