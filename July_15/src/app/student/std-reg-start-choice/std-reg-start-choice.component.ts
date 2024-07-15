import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { MatStepper } from '@angular/material/stepper';
import { forkJoin, map } from 'rxjs';

interface StartOption {
  value: number;
  label: string;
}

interface TypeOfStudent {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-std-reg-start-choice',
  templateUrl: './std-reg-start-choice.component.html',
  styleUrls: ['./std-reg-start-choice.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class StdRegStartChoiceComponent implements OnInit {
  breadscrums = [
    {
      title: 'Student Registration',
      items: [{ title: 'Student Management' }],
      active: 'Student Registration',
    },
  ];
  @ViewChild('stepper') stepper: MatStepper;

  //constants
  selectedStudent: any;
  appRefId: any = '';
  apiService = inject(APICallService);
  authService = inject(AuthService);
  isLinear: any = true;

  clientId: any;
  campusId: any;
  roleId: any;
  campusName: string = '';

  languageSpokenatHome_Field: any = false;
  score4Skills_Field: any = false;
  scoreOverall_Field: any = false;

  fileName: any;

  originData: TypeOfStudent[] = [
    { value: 'OS', viewValue: 'Overseas Student (Offshore)' },
    { value: 'OSA', viewValue: 'Overseas Student in Australia (Onshore)' },
    { value: 'RS', viewValue: 'Resident Student (Domestic)' },
  ];

  studenttype: any;
  //forms related data
  //1
  origin = this._formBuilder.group({
    origin: ['', Validators.required],
  });
  //2
  personalInformationFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    firstname: ['', Validators.required],
    middlename: ['', Validators.required],
    lastname: ['', Validators.required],
    nickname: ['', Validators.required],
    emailid: ['', Validators.required],
    alternameemail: ['', Validators.required],
    passportno: ['', Validators.required],
    visanumber: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    nationality: ['', Validators.required],
    countrybirth: ['', Validators.required],
    visatype: ['', Validators.required],
    passportexpirydate: ['', Validators.required],
    visaexpirydate: ['', Validators.required],
  });
  //3
  usiAndAddressFormGroup = this._formBuilder.group({
    uniquestudentidentifier: ['', Validators.required],

    current_country: ['', Validators.required],
    current_flatno: ['', Validators.required],
    current_streetno: ['', Validators.required],
    current_streetname: ['', Validators.required],
    current_state: ['', Validators.required],
    current_housephone: ['', Validators.required],
    current_mobileno: ['', Validators.required],
    current_buldingpropertyname: ['', Validators.required],
    current_citytown: ['', Validators.required],
    current_postcode: ['', Validators.required],
    current_workphone: ['', Validators.required],

    overseas_country: ['', Validators.required],
    overseas_flatno: ['', Validators.required],
    overseas_streetno: ['', Validators.required],
    overseas_streetname: ['', Validators.required],
    overseas_state: ['', Validators.required],
    overseas_housephone: ['', Validators.required],
    overseas_mobileno: ['', Validators.required],
    overseas_buldingpropertyname: ['', Validators.required],
    overseas_citytown: ['', Validators.required],
    overseas_postcode: ['', Validators.required],
    overseas_workphone: ['', Validators.required],
  });
  //4
  // languageandculturalDiversityFormGroup
  language = this._formBuilder.group({
    origin: [''],
    engmain: [''],
    spokenhouse: [''],
    secondary: [''],
    testenglish: [''],
  });

  englishtest = this._formBuilder.group({
    testname: ['', Validators.required],
    whencomplete: ['', Validators.required],
    scoretype: ['', Validators.required],
    listeningscore: ['', Validators.required],
    readingscore: ['', Validators.required],
    writingscore: ['', Validators.required],
    speakingscore: ['', Validators.required],
    overallscore: ['', Validators.required],
  });

  schooling = this._formBuilder.group({
    highestschool: ['', Validators.required],
    stillsecondary: ['', Validators.required],
    previousqualifications: ['', Validators.required],
  });

  employment = this._formBuilder.group({
    currentemploymentstatus: ['', Validators.required],
    previousemployeedetails: ['', Validators.required], //not added
    holidaybreaks: ['', Validators.required],
    studylocation: ['', Validators.required],
    studymode: ['', Validators.required],
    tutionweeks: ['', Validators.required],
  });

  addservicerequest = this._formBuilder.group({
    service: ['', Validators.required],
    categeory: ['', Validators.required],
    facility: ['', Validators.required],
    provider: ['', Validators.required],
    price: ['', Validators.required],
    servicestartdate: ['', Validators.required],
    comment: ['', Validators.required],
    studenthealthcover: ['', Validators.required],
    OSHCprovider: ['', Validators.required],
    OSHCtype: ['', Validators.required],
    coverduration: ['', Validators.required],
    fee: ['', Validators.required],
    startdate: ['', Validators.required],
  });

  disability = this._formBuilder.group({
    disability: ['', Validators.required],
    liketorecive: ['', Validators.required],
    contactname: ['', Validators.required],
    contacttype: ['', Validators.required],
    relationship: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });

  accountmanager = this._formBuilder.group({
    accountmanager: ['', Validators.required],
  });
  admissionstaff = this._formBuilder.group({
    admstaff: ['', Validators.required],
  });
  studentcourse: any = this._formBuilder.group({
    coursetype: ['', Validators.required],
    selectedcourse: ['', Validators.required],
    coursecode: [''],
    underagent: ['', Validators.required],
    agentcode: [''],
    start: [''],
    finish: [''],
    scholarship: ['', Validators.required],
    studyreason: ['', Validators.required],
    studentcode: ['', Validators.required],
    intakeyear: ['', Validators.required],
    intakecode: [''],
    tuitionfee: [''],
    materialfee: [''],
    enrollmentfee: [''],
    courses_list_code: [''],
    upfronfee_total: ['']
  });

  hearabout = this._formBuilder.group({
    press: ['', Validators.required],
    internet: ['', Validators.required],
    agent: ['', Validators.required],
    friend: ['', Validators.required],
    other: ['', Validators.required],
  });

  PreviewFormGroup = this._formBuilder.group({
    // english_main_language: ['', Validators.required],
  });

  uploadDocFormGroup = this._formBuilder.group({
    upload_doc: ['', Validators.required],
  });

  appStatus = 0;
  selectedIndex: number;
  courses: any[] = [];
  courseTypes: any[] = [];
  filteredCourses: any[] = [];
  selectedCourse: any;
  agentsList: any = [];
  servicesList: any = [];
  serviceCategoryList: any = [];
  facilitiesList: any = [];
  providersList: any = [];
  OSHCProvidersList: any = [];
  OSHCTypesList: any = [];
  formattedData: any;
  groupedData: any;
  countries: any = [];
  visatypes: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParamMap.subscribe((params) => {
      if (params) {
        this.appRefId = params.get('appRefId');
        const appStatusString = params.get('appstatus');
        // Handle potential null value
        if (appStatusString !== null) {
          // Guaranteed non-null string, safe to convert
          this.appStatus = parseFloat(appStatusString);
        } else {
          // Handle the case where appStatusString is null
          console.error(
            'appstatus is null. Using a default value or handling as needed.'
          );
          // Assign a default value or take other appropriate actions
          this.appStatus = 0; // Example default value (replace with your logic)
        }
        console.log('APP STATUS:', this.appStatus);
      }
    });
  }
  ngOnInit(): void {
    this.loadData();
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;

    if (this.selectedIndex === this.appStatus) {
      this.disablePreviousSteps();
    }
    this.getCountries();
    this.getVisaTypes();
    this.getCourse();
    this.getAllAgentsList();
    this.getAllServicesList();
    this.getAllServiceCategories();
    this.getAllFacilities();
    this.getAllProviders();
    this.getAllOSHCProvidersList();
    this.getAllOSHCTypesList();
    this.getFormattedData();
  }

  ngAfterViewInit(): void {
    // Disable previous steps after the view has been initialized
    this.disablePreviousSteps();
    this.getFormattedData();
  }
  onOriginSection(selection: any){
    let origin = selection.value
    if(origin == 'OS'){
      this.studenttype = 'Offshore'
    }
    else if(origin == 'OSA'){
      this.studenttype = 'Onshore'
    }
    else{ 
      this.studenttype ='Domestic'
    }
  }
  async getVisaTypes() {
    const url = '/studentapi/Student/availablevisalist';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.visatypes = res.data.list;
      console.log('Visa Type List: ', this.visatypes);
    });
  }
  async getCountries() {
    const url = '/studentapi/Student/availablecountries';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.countries = res.data.list;
      console.log('Countries List: ', this.countries);
    });
  }
  disablePreviousSteps(): void {
    for (let i = 0; i < this.selectedIndex; i++) {
      this.stepper.steps.toArray()[i].editable = false;
      this.stepper.steps.toArray()[i].completed = true;
      this.stepper.steps.toArray()[i].optional = false;
    }
  }
  areyouNextButtonClick() {
    // console.log(this.origin.value);
  }
  id: any;
  newId: any;
  async getCourse() {
    const availableCoursesUrl = '/studentapi/Student/AvailableCourses';
    const courseFeeListUrl = '/studentapi/Student/CourseFeeList';
    const payload = {};

    forkJoin([
      this.apiService.post(availableCoursesUrl, payload),
      this.apiService.post(courseFeeListUrl, payload),
    ])
      .pipe(
        map(([coursesRes, feesRes]) => {
          const courses = coursesRes.data.list;
          const fees = feesRes.data.list;
          console.log('Courses: ', courses);
          console.log('Fees: ', fees);

          // Merge course information with fees
          return courses.map((course) => {
            const fee = fees.find((f) => f.coursecode === course.coursecode);
            return { ...course, ...fee };
          });
        })
      )
      .subscribe((mergedCourses) => {
        console.log('Merged Courses: ', mergedCourses);
        this.courses = mergedCourses;
        this.courseTypes = [
          ...new Set(mergedCourses.map((course) => course.coursetypecode)),
        ];
      });

    this.studentcourse
      .get('coursetype')
      ?.valueChanges.subscribe((coursetype) => {
        this.filteredCourses = this.courses.filter(
          (course) => course.coursetypecode === coursetype
        );
        console.log('Filtered Courses: ', this.filteredCourses);
        this.studentcourse.get('selectedcourse')?.setValue('');
      });

    this.studentcourse
      .get('selectedcourse')
      ?.valueChanges.subscribe((coursename) => {
        this.courses.find((course) => {
          if (course.name === coursename) {
            console.log('TRUE');
            this.selectedCourse = course;
          } else {
            console.log('FALSE');
          }
        });

        if (this.selectedCourse) {
          this.studentcourse.patchValue({
            courses_list_code: this.selectedCourse.code,
            coursecode: this.selectedCourse.coursecode,
            start: this.selectedCourse.fromdate.slice(0, 10),
            finish: this.selectedCourse.todate.split(' ')[0],
            intakecode: this.selectedCourse.intakecode,
            tuitionfee: this.selectedCourse.inttutionfee,
            materialfee: this.selectedCourse.materialfee,
            enrollmentfee: this.selectedCourse.enrollmentfee,
            upfronfee_total: this.selectedCourse.upfronfee_total,
          });
        }
      });
  }
  async getFormattedData() {
    const url = '/studentapi/Student/studentpreviewdata';
    const payload = { code: this.appRefId };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      console.log('Original Response:', res);
      const courseList = res.data.previewdata.courseslist;
      console.log('Course List :', courseList);
      const studentInfo = res.data.previewdata.studentInfo;
      console.log('Student Info :', studentInfo);
      this.formattedData = res.data.previewdata.studentparams;
      console.log('formattedData List: ', this.formattedData);
      const groupedParams = this.formattedData.reduce((acc, param) => {
        const { groupname, paramkey, paramval } = param;
        if (!acc[groupname]) {
          acc[groupname] = {};
        }
        acc[groupname][paramkey] = paramval;
        return acc;
      }, {});

      this.groupedData = {
        studentInfo: { ...studentInfo },
        courseList: { ...courseList },
        ...groupedParams,
      };
      // this.groupedData = { ...studentInfo,  ...courseList, ...groupedParams}
      console.log('Group Paramssssssssssssssssss Data: ', this.groupedData);
    });
  }
  async getAllServicesList() {
    const url = '/studentapi/Student/listofservices';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.servicesList = res.data.list;
      console.log('SErvices List: ', this.servicesList);
    });
  }
  async getAllServiceCategories() {
    const url = '/studentapi/Student/listofservicescategory';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.serviceCategoryList = res.data.list;
      console.log('SErvices CategoryList: ', this.serviceCategoryList);
    });
  }
  async getAllFacilities() {
    const url = '/studentapi/Student/listoffacility';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.facilitiesList = res.data.list;
      console.log('SErvices Facility List: ', this.facilitiesList);
    });
  }
  async getAllProviders() {
    const url = '/studentapi/Student/listoffacilitycategory';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.providersList = res.data.list;
      console.log('SErvice  Providers List: ', this.providersList);
    });
  }
  async getAllOSHCProvidersList() {
    const url = '/studentapi/Student/listofOSHCproviders';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.OSHCProvidersList = res.data.list;
      console.log('OSHC  Providers List: ', this.OSHCProvidersList);
    });
  }
  async getAllOSHCTypesList() {
    const url = '/studentapi/Student/listofOSHCtypes';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.OSHCTypesList = res.data.list;
      console.log('OSHC Types List: ', this.OSHCTypesList);
    });
  }
  async getAllAgentsList() {
    const url = '/studentapi/Student/allavailableagents';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.agentsList = res.data.list;
    });
  }
  onAgentChange(selectedAgentName: string): void {
    const selectedAgent = this.agentsList.find(
      (agent) => agent.agentname === selectedAgentName
    );

    if (selectedAgent) {
      this.studentcourse.get('agentcode')?.setValue(selectedAgent.agentcode);
      this.studentcourse.get('agentid')?.setValue(selectedAgent.agentcode);
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

  async personalInformationNextButtonClick() {
    console.log(this.personalInformationFormGroup.value);
    const idUrl = '/studentapi/Student/StudentsautoIdNo';
    const pload = {};
    try {
      await this.apiService.post(idUrl, pload).subscribe({
        next: (res: any) => {
          this.id = parseInt(res.data.list[0].id) + 1;
          if (!this.id) {
            this.newId = 240000100001;
            console.log('New Id: ', this.newId);
            this.appRefId = 'E' + this.newId;
          } else {
            console.log('ID form Backend: ', this.id);
            this.newId = 240000100000 + this.id;
            console.log('New Id: ', this.newId);
            this.appRefId = 'E' + this.newId;
            console.log('appRefId: ', this.appRefId);
          }
          this.appStatus = 1;
          const personalData = {
            code: this.appRefId,
            appstatus: this.appStatus,
            ...this.origin.value,
            studenttype : this.studenttype,
            ...this.personalInformationFormGroup.value,
          };
          console.log('Personal Data: ', personalData);
          const url = '/studentapi/Student/StudentAddorUpdate';
          const payload = personalData;
          try {
            this.apiService.post(url, payload).toPromise();
          } catch (err) {
            console.log(err);
          }
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  copyCurrentAddress(event: any): void {
    if (event.checked) {
      this.usiAndAddressFormGroup.patchValue({
        overseas_country:
          this.usiAndAddressFormGroup.get('current_country')?.value,
        overseas_flatno:
          this.usiAndAddressFormGroup.get('current_flatno')?.value,
        overseas_streetno:
          this.usiAndAddressFormGroup.get('current_streetno')?.value,
        overseas_streetname:
          this.usiAndAddressFormGroup.get('current_streetname')?.value,
        overseas_state: this.usiAndAddressFormGroup.get('current_state')?.value,
        overseas_housephone:
          this.usiAndAddressFormGroup.get('current_housephone')?.value,
        overseas_mobileno:
          this.usiAndAddressFormGroup.get('current_mobileno')?.value,
        overseas_buldingpropertyname: this.usiAndAddressFormGroup.get(
          'current_buldingpropertyname'
        )?.value,
        overseas_citytown:
          this.usiAndAddressFormGroup.get('current_citytown')?.value,
        overseas_postcode:
          this.usiAndAddressFormGroup.get('current_postcode')?.value,
        overseas_workphone:
          this.usiAndAddressFormGroup.get('current_workphone')?.value,
      });
    } else {
      this.usiAndAddressFormGroup.patchValue({
        overseas_country: '',
        overseas_flatno: '',
        overseas_streetname: '',
        overseas_state: '',
        overseas_housephone: '',
        overseas_mobileno: '',
        overseas_buldingpropertyname: '',
        overseas_streetno: '',
        overseas_citytown: '',
        overseas_postcode: '',
        overseas_workphone: '',
      });
    }
  }

  usiAndAddressNextButtonClick() {
    console.log(JSON.stringify(this.usiAndAddressFormGroup.value));
    const formData = this.usiAndAddressFormGroup.value;
    const payload = this.transformToPayload(formData);
    this.sendPayloadToBackend(payload);
  }

  LanguageNextButtonClick() {
    const formData = { ...this.language.value, ...this.englishtest.value };
    console.log('LANG and ENG ', formData);
    const payload = this.transformToPayloadLanguage(formData);
    this.sendPayloadToBackend(payload);
  }
  transformToPayloadLanguage(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Language&EnglishTest',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  schoolingAndEmploymentNextButtonClick() {
    const formData = { ...this.schooling.value, ...this.employment.value };
    console.log('Schooling and Employment ', formData);
    const payload = this.transformToPayloadSchooling(formData);
    this.sendPayloadToBackend(payload);
  }
  transformToPayloadSchooling(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Schooling&Employment',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  servicesNextButtonClick() {
    const formData = this.addservicerequest.value;
    console.log('Services ', formData);
    const payload = this.transformToPayloadServices(formData);
    this.sendPayloadToBackend(payload);
  }
  transformToPayloadServices(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Services&OSHC',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  async disbilityNextButtonClick() {
    const formData = {
      ...this.disability.value,
      ...this.accountmanager.value,
      ...this.admissionstaff.value,
    };
    console.log('Disablity Form Data: ', formData);
    const payload = this.transformToPayloadDisability(formData);
    this.sendPayloadToBackend(payload);
    this.getFormattedData();
  }
  transformToPayloadDisability(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Disability&Emergency',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  async studentcourseNextButtonClick() {
    const formData = this.studentcourse.value;
    this.appStatus = this.appStatus + 1;
    console.log(
      'Apply Course Data with appStatus+1: ',
      formData,
      this.appStatus
    );
    const addCourseURL = '/studentapi/Student/studentapplycourses';
    const pLoad = {
      courses_list_code: formData.courses_list_code,
      studentcode: this.appRefId,
      underagent: formData.underagent,
      coursetype: formData.coursetype,
      coursecode: formData.coursecode,
      agentcode: formData.agentcode,
      agentid: formData.agentcode,
      intakeyear: formData.intakeyear,
      intakecode: formData.intakecode,
      selectedcourse: formData.selectedcourse,
      startfinish: formData.start + ' - ' + formData.finish,
      scholarship: formData.scholarship,
      studyreason: formData.studyreason,
      status: '1',
    };
    console.log('formData as Payload: ', pLoad);
    await this.apiService.post(addCourseURL, pLoad).subscribe();

    this.updateappStatus();
  }
  transformToPayload(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Map each form control to the required payload format
    const mapping = {
      uniquestudentidentifier: 'uniquestudentidentifier',
      current_country: 'country',
      current_buldingpropertyname: 'buldingpropertyname',
      current_flatno: 'flatno',
      current_streetno: 'streetno',
      current_streetname: 'streetname',
      current_citytown: 'citytown',
      current_state: 'state',
      current_postcode: 'postcode',
      current_housephone: 'housephone',
      current_workphone: 'workphone',
      current_mobile_phone: 'mobileno',
    };

    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        const paramkey = mapping[key] || key;
        payload.push({
          code: this.appRefId,
          groupname: key.startsWith('current')
            ? 'currentaddress'
            : key.includes('uni')
            ? 'usi'
            : 'overseasaddress',
          paramkey: paramkey,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  sendPayloadToBackend(payload: any[]): void {
    this.appStatus = this.appStatus + 1;

    const apiUrl = '/studentapi/Student/studentparams'; // Replace with your backend API URL
    this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Payload sent successfully', response);
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
    this.updateappStatus();
  }
  updateappStatus() {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate ';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
    };
    this.apiService.post(apiUrl2, pLoad).subscribe();
  }

  selectionChangeOfengMain(event: any) {
    if (event.value == 'yes') {
      this.languageSpokenatHome_Field = false;
    } else {
      this.languageSpokenatHome_Field = true;
    }
  }
  selectionChangeOfScoreValue(event: any) {
    console.log(event.value);

    if (event.value == '4skills') {
      this.score4Skills_Field = true;
      this.scoreOverall_Field = false;
    } else if (event.value == 'overallonly') {
      this.scoreOverall_Field = true;
      this.score4Skills_Field = false;
    } else {
      this.score4Skills_Field = false;
      this.scoreOverall_Field = false;
    }
  }
  onHandleChangeOfuploadDocument(event: any) {
    console.log(event.target.files);

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = {
        ...this.uploadDocFormGroup.value,
      };

      this.apiService.UploadFile(formData).subscribe((response: any) => {
        // resolve(response);
        console.log(response);
      });
    }
  }
  
}
