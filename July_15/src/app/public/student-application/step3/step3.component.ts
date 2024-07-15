import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APICallService } from '@core';
import { forkJoin, map } from 'rxjs';
import AOS from "aos";
import { globalProperties } from '@shared/globalProperties';



@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  appRefId: any;
  appStatus: any
  courses: any[] = [];
  courseTypes: any[] = [];
  filteredCourses: any[] = [];
  selectedCourse: any;
  submitted: any = false



  //! Edit Form enable boolean
  isEditFromEnable: boolean = false;
  //! each row Obj
  editObj: any = {};

  nameRegx = globalProperties.nameRegx;

stepid: any
fromPreviewStep: any
fromPrevious: any
  isBtnUpdateEnable: boolean = false;
  
  agentsList: any = [];
  CourseIntakeDates: any = [];
  availableyears: any = [];
  availableIntakenames: any = [];
  apiService = inject(APICallService);
  private _formBuilder = inject(FormBuilder)
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.appRefId = params['appRefId']
      const appStatusString = params['appstatus']
      if (params['fromPreviewStep']) {
        this.fromPreviewStep = params['fromPreviewStep']
      }
      if (params['fromPrevious']) {
        this.fromPrevious = params['fromPrevious']
      }
      if (params['stepid']) {
        this.appRefId = params['appRefId']
        this.stepid = params['stepid']
      }
      // if (appStatusString !== null) {
      // Guaranteed non-null string, safe to convert
      //   this.appStatus = parseFloat(appStatusString);
      //   this.appStatus = this.appStatus + 1
      // }
    })
  }
  ngOnInit(): void {
    this.getCourse();
    this.getAllAgentsList();
    this.getAllCourseIntakeDates();
    this.getAppliedCourses();

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });



  }
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
    studentcode: [''],
    intakeyear: ['', Validators.required],
    courseintakename:[''],
    intakecode: [''],
    tuitionfee: [''],
    materialfee: [''],
    enrollmentfee: [''],
    courses_list_code: [''],
    upfronfee_total: [''],
  });

  otherdetails = this._formBuilder.group({
    holidaybreaks: [''],
    studylocation: [''],
    studymode: [''],
    tutionweeks: [''],

  });
  get f(): { [key: string]: AbstractControl } {
    return this.studentcourse.controls;
  }

  async getAppliedCourses() {
    const courseListAPI = '/studentapi/Student/studentappliedcoursesList'
    const payload = {
      code: this.appRefId
    }
    await this.apiService.post(courseListAPI, payload).subscribe((res: any) => {

      this.courseList = res?.data?.list?.map((item) => {
        if (item.startfinish && item.startfinish.includes(" - ")) {
          [item.startDate, item.finishDate] = item.startfinish.split(' - ');
        }
        return item;
      })
      
    });
  }

  emptyCourseList() {
    this.studentcourse.patchValue({
      coursetype: '',
      selectedcourse: '',
      coursecode: '',
      underagent: '',
      agentcode: '',
      start: '',
      finish: '',
      scholarship: '',
      studyreason: '',
      studentcode: '',
      intakeyear: '',
      courseintakename:'',
      intakecode: '',
      tuitionfee: '',
      materialfee: '',
      enrollmentfee: '',
      courses_list_code: '',
      upfronfee_total: '',
    })
  }

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
          const courses = coursesRes?.data?.list;
          const fees = feesRes?.data?.list;


          // Merge course information with fees
          return courses?.map((course) => {
            const fee = fees.find((f) => f.coursecode === course.coursecode);
            return { ...course, ...fee };
          });
        })
      )
      .subscribe((mergedCourses) => {

        this.courses = mergedCourses;
        this.courseTypes = [
          ...new Set(mergedCourses?.map((course) => course.coursetypecode)),
        ];
      });

    this.studentcourse
      .get('coursetype')
      ?.valueChanges.subscribe((coursetype) => {
        this.filteredCourses = this.courses.filter(
          (course) => course.coursetypecode === coursetype
        );

        this.studentcourse.get('selectedcourse')?.setValue('');
      });

    this.studentcourse
      .get('selectedcourse')
      ?.valueChanges.subscribe((coursename) => {
        this.courses.find((course) => {
          if (course.name === coursename) {
            this.selectedCourse = course;
          } else {
            console.log('FALSE');
          }
        });
        console.log("selected course",this.selectedCourse);
        
        if (this.selectedCourse) {
          
          this.studentcourse.patchValue({
            courses_list_code: this.selectedCourse.code,
            coursecode: this.selectedCourse.coursecode,
            start: this.selectedCourse.fromdate.slice(0, 10),
            finish: this.selectedCourse.todate.split(' ')[0],
            intakecode: this.selectedCourse.courseintakecode,
            tuitionfee: this.selectedCourse.tutionfee,
            materialfee: this.selectedCourse.materialfee,
            enrollmentfee: this.selectedCourse.enrollmentfee,
            upfronfee_total: this.selectedCourse.upfronfee_total,
            // applicationrequest: this.selectedCourse.applicationrequest,
            // specialcondition: this.selectedCourse.specialcondition,
          });
        }
      });
  }
  async getAllAgentsList() {
    const url = '/studentapi/Student/allavailableagents';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.agentsList = res?.data?.list;
    });
  }
  async getAllCourseIntakeDates() {
    const url = '/studentapi/Student/allcourseintakedates';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.CourseIntakeDates = res?.data?.list;

      this.availableyears = [
        ...new Set(this.CourseIntakeDates?.map((dates) => dates.availableyears)),
      ];
    });
  }
  onIntakeyearChange(selectedDate: string): void {
    console.log("selected date",selectedDate);
    
    this.availableIntakenames = this.CourseIntakeDates.filter((date) => {
      return date.availableyears == selectedDate
    })
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



  async applyCourse() {
    const formData = this.studentcourse.value;
    console.log("course form data ",formData);
    

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
      courseintakename:formData.courseintakename,
      intakecode: formData.intakecode,
      selectedcourse: formData.selectedcourse,
      startfinish: formData.start + ' - ' + formData.finish,
      scholarship: formData.scholarship,
      studyreason: formData.studyreason,

      status: '1',
    };
    
    await this.apiService.post(addCourseURL, pLoad).subscribe((res) => {
      console.log("ressss",res);
      this.isBtnUpdateEnable = false;
     
      this.getAppliedCourses();
      this.updateappStatus();
      this.emptyCourseList();

    });
  }

  updateappStatus() {
    this.appStatus = 3;
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate ';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
      status: 0
    };

    this.apiService.post(apiUrl2, pLoad).subscribe();

  }
  selectedCourseCode: any;
  courseList: any = [];

  selectedCourseName: any
  selectedAgentProvider: any
  selectedAgentName: any
  selectedStartDate: any
  selectedFinishDate: any
  selectedStatus: any
  selectedCourseFee: any
  selectedEnrolledFee: any
  selectedMaterialFee: any
  showCourseAppliedCourse() {
    const apiUrl2 = '/studentapi/Student/studentappliedcoursesList';
    const pLoad = {
      code: this.appRefId
    };
    this.apiService.post(apiUrl2, pLoad).subscribe({
      next: (res: any) => {


        const data = res?.data?.list[0]
        this.selectedCourseCode = data.coursecode
        this.selectedCourseName = data.selectedcourse
        this.selectedAgentName = data.underagent

        if (data.startfinish && data.startfinish.includes(" - ")) {
          // Split the string by the delimiter " - "
          [this.selectedStartDate, this.selectedFinishDate] = data.startfinish.split(" - ");
        }
        if (data.status == 1) {
          this.selectedStatus = 'Applied'
        }

        this.selectedCourseFee = data.tutionfee
        this.selectedEnrolledFee = data.enrollmentfee
        this.selectedMaterialFee = data.materialfee
      }
    });
  }
  gotoStep2() {
    this._router.navigate(['/public/step2'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus - 1, stepid: 2, fromPrevious: true } })
  }

  gotoPreviewwithUpdate() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
  }
  gotoStep4() {
    this._router.navigate(['/public/step4'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus,stepid:4 } })
  }
  //! Accept only letters and space 
  letterWithSpaceOnly(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 32) {
      return true;
    } else if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  //! Year length Checking
  checkYearLength(elem) {
    if (elem.target.value?.length < 4) {
      return true;
    }
    return false;
  }

  //? columns of table
  displayedColumns: string[] = ['coursecode', 'selectedcourse', 'underagent', 'startDate', 'finishDate', 'status', 'tutionfee', 'materialfee', 'enrollmentfee', 'action'];

  //? Delete course 
  async deleteCourse(course: any) {

    let courses_list_code = course?.courses_list_code;
    let studentcode = course?.studentcode;
    const courseDeleteURL = '/studentapi/Student/deletecourse'
    const payload = {
      courses_list_code: courses_list_code,
      studentcode: studentcode
    }

    await this.apiService.post(courseDeleteURL, payload).subscribe((res: any) => {
      this.getAppliedCourses();
    });
  }

  OnClickOfCancel() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: 4, stepid: 5 } })
  }
  
  editCourse(course: any) {
    console.log("course obj ", course);
    this.onIntakeyearChange(course.intakeyear);
    // this.studentcourse.get('courseintakename').setValue(course?.courseintakename)
    this.studentcourse.patchValue(course);
    this.isBtnUpdateEnable = true;
  }


}
