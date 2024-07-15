import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { Validators } from 'ngx-editor';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?: boolean
  route?: string; // Optional route path for the button
}

@Component({
  selector: 'app-std-englishtest',
  templateUrl: './std-englishtest.component.html',
  styleUrls: ['./std-englishtest.component.scss'],
})
export class StdEnglishtestComponent {
  //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;

  studentpersonalInfo: any = {}
  statusdescription: any
  studentparams: any = []
  groupedData: any



  isLanguageSpokenatHome_Field: any = false;
  isScore4Skills_Field: any = false;
  isScoreOverall_Field: any = false;
  languagesData: any = [];
  schoolingData: any = [];
  engtestsData: any = [];
  countries: any = [];



  apiService = inject(APICallService);
  private _formBuilder = inject(FormBuilder)
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
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest', selected: true },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments' },
  ];

  //brad crumbs and campus constans for all pages ends here

  breadscrums = [
    {
      title: 'StudentEnglishTest',
      items: [{ title: 'Student Management' }],
      active: 'StudentEnglishTest',
    },
  ];

  
  // languageandculturalDiversityFormGroup
  language = this._formBuilder.group({
    aboriginal: ['Yes'],
    engmain: [''],
    spokenhouse: [''],
    secondary: ['Yes'],
    testenglish: ['Yes'],
    
  });

  englishtest = this._formBuilder.group({
    testname: [''],
    whencomplete: ["", Validators.required],
    scoretype: [''],
    listeningscore: [''],
    readingscore: [''],
    writingscore: [''],
    speakingscore: [''],
    overallscore: [''],
  });

  schooling = this._formBuilder.group({
    highestschool: [''],
    stillsecondary: ['No'],
    // previousqualifications: ['', Validators.required],
    qualificationlevel: [''],
    qualificationname: [''],
    schoolinstutionname: [''],
    stateorcountry: [''],
    yearcompleted: [''],

  });


  employment = this._formBuilder.group({
    currentemploymentstatus: [''],
    // previousemployeehistory: [''], 
    employeer: [''],
    occiption: [''],
    durationto: [''],
    duties: [''],

  });

  appStatus: any

  selectionChangeOfengMain(event: any) {
    console.log(event)
    if (event.value == 'yes') {
      this.isLanguageSpokenatHome_Field = false;
    } else {
      this.isLanguageSpokenatHome_Field = true;
    }
  }
  selectionChangeOfScoreValue(event: any) {
    console.log(event.value);

    if (event.value == '4skills') {
      this.isScore4Skills_Field = true;
      this.isScoreOverall_Field = false;
    } else if (event.value == 'overallonly') {
      this.isScoreOverall_Field = true;
      this.isScore4Skills_Field = false;
    } else {
      this.isScore4Skills_Field = false;
      this.isScoreOverall_Field = false;
    }
  }





  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.getstudentInfo();
    this.setPayload({
      stepid: 2,
      code: this.studentId,
    })
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
  async getstudentstatus() {
    const statusMaster = "/studentapi/Student/statusMaster"
    const payload = {}
    await this.apiService.post(statusMaster, payload).subscribe(
      (response) => {
        const allStatusNames = response?.data?.list
        const Statusmaster = allStatusNames.filter((e) => {
          return e.statusid == this.groupedData?.studentInfo?.status
        })
        this.statusdescription = Statusmaster[0].statusdescription

      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
  }




  // backToStdProfile() {
  //   this.router.navigate(['/student/studentProfile'], {
  //     queryParams: { id: this.studentId },
  //   });
  // }
  onButtonClick(button: ButtonData) {

    if (button.route) {
      console.log("J", button)
      this.router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }

  async setPayload(payload) {
    const apiUrl = '/studentapi/Student/getstudentparams'; // Replace with your backend API URL
     
    await this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log("student params res ",response);
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
  }


  async getstudentInfo() {

    const apiUrl = '/studentapi/Student/getstudentparams'; // Replace with your backend API URL
    const payload = {
      stepid: 1,
      code: this.studentId,
    }
    await this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log("student params res ",response);
        
        this.studentpersonalInfo = response?.data?.previewdata?.studentpersonalInfo
        this.studentparams = response?.data?.previewdata?.studentparams
        const groupedParams = this.studentparams?.reduce((acc, param) => {

          const { groupname, paramkey, paramval } = param;
          if (!acc[groupname]) {
            acc[groupname] = {};
          }
          acc[groupname][paramkey] = paramval;
          return acc;
        }, {});

        this.getstudentstatus() // to get the stausdescription based on status number 
        this.getstudentstatus() 
        
        this.groupedData = {
          studentInfo: { ...this.studentpersonalInfo },
          ...groupedParams,
          stdId: this.studentId
        };

        console.log(this.groupedData)

      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );


  }
  

  
  selectFormValues(event: any, radioGroup: string) {
    
    if (radioGroup.toLocaleUpperCase() == 'ENGMAIN_YES') {
      this.isLanguageSpokenatHome_Field = false;
      this.language.get('engmain').patchValue(event.value)
    } else if (radioGroup.toLocaleUpperCase() == 'ENGMAIN_NO') {
      this.isLanguageSpokenatHome_Field = true;
      this.language.get('engmain').patchValue(event.value)
    }
   
    
    if (radioGroup.toLocaleUpperCase() == 'SCORETYPE_4SKILLS') {
      this.englishtest.get('scoretype').patchValue(event.value);
      this.isScore4Skills_Field = true;
      this.isScoreOverall_Field = false;
    } else if (radioGroup.toLocaleUpperCase() == 'SCORETYPE_OVERALLONLY') {
      this.englishtest.get('scoretype').patchValue(event.value);
      this.isScore4Skills_Field = false;
      this.isScoreOverall_Field = true;
    }
    
  }

  async getAllLanguagesData() {
    const url = '/studentapi/Student/languageslist';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.languagesData = res.data.list;
      console.log("languagesData ", res);

    });
  }
  async getAllAvailableSchoolingData() {
    const url = '/studentapi/Student/availablescholling';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.schoolingData = res.data.list;
      console.log("schoolingData ", res);

    });
  }
  async getAllAvailableEngTestsData() {
    const url = '/studentapi/Student/availableEngTests';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.engtestsData = res.data.list;
      console.log("engtestsData ", res);

    });
  }

}
