import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';


interface ButtonData {
  icon: string;
  tooltip: string;
  selected?:boolean
  route?: string; // Optional route path for the button
}


@Component({
  selector: 'app-std-result',
  templateUrl: './std-result.component.html',
  styleUrls: ['./std-result.component.scss']
})
export class StdResultComponent {
 private _formBuilder = inject(FormBuilder)
   //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail' },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' ,selected:true},
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments',selected:false},
  ];


  breadscrums = [
    {
      title: 'StudentResult',
      items: [{ title: 'Student Management' }],
      active: 'StudentResult',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);

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

  backToStdProfile() {
    this.router.navigate(['/student/studentProfile'], { queryParams: { id: this.studentId } });
  }
  onButtonClick(button: ButtonData) {
  
    if (button.route) {
      console.log("J",button)
      this.router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }
  studentEnrlmntInfo = this._formBuilder.group({
    studentId: [''],
    studentName: [''],
    status: [''],
    course: [''],
    startDate: [''],
    finishDate: [''],
    stdntCourseTmplt: [''],
    resultCalcMethod: [''],
    semester: [''],
    term:[''],
    
  })
  enrolmentAction = this._formBuilder.group({
    typeOfEnrolment: [''],
    courseStage: [''],
    activityStartDate: [''],
    activityFinishDate: [''],
    studyReason: [''],
    venueTraningLocation: [''],
    fundingState: [''],
    fundingNAT: [''],
    saceStudentId: [''],
    finalOutCome:['']
  })

  displayedColumns: string[] = ['semester_term', 'course_stage', 'subject_module', 'study_period', 'final_outcome', 'grade','marks','unit_details','action'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  semester_term: string;
  course_stage: string;
  subject_module: string;
  study_period: string;
  final_outcome: string;
  grade: string;
  marks: string;
  unit_details: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    semester_term: 'Nov Cert IV (Term 2)', course_stage: '1', subject_module: 'AURAEA004 Manage Environmental and sustainability best practice in an automotive workplace(Attempt 1) Comment: Individual Enrolment',study_period: 'No Batch', final_outcome: '20/11/2023 - 19/05/2024', grade: 'Enrolled',marks:'',unit_details:''
  }
];
