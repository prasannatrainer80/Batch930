import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-courses-fee',
  templateUrl: './courses-fee.component.html',
  styleUrls: ['./courses-fee.component.scss'],
})
export class CoursesFeeComponent {
  stdDetailsid: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;

  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);

  courses: any[] = [];
  courseTypes: any[] = [];
  filteredCourses: any[] = [];

  //! Edit Form enable boolean
  isEditFromEnable: boolean = false;
  //! each row Obj
  editObj: any = {};
  //! course fee declaration
  coursefeeTotal:number = 0;
  tutionFee:number = 0;
  materialFee:number = 0;
  enrollmentFee: number = 0;
  //! upfront fee declaration
  totalUpfrontFee: number = 0;
  upfrontTutionFee: number = 0;
  upfrontMaterialFee: number = 0;
  upfrontEnrollmentFee: number = 0;



  breadscrums: any[] = [
    {
      title: 'Courses Fee',
      items: [
        {
          title: 'Course Management',
          // url: '/studentreg/list',
        },
      ],
      active: 'Courses Fee',
    },
  ];

  courseFee = this._formBuilder.group({
    code: ['', Validators.required],
    coursetype: ['', Validators.required],
    coursecode: ['', Validators.required],
    origin: ['', Validators.required],
    upfronfee_total: ['', Validators.required],
    tutionfee: ['', Validators.required],
    upfront_tutionfee: ['', Validators.required],
    materialfee: ['', Validators.required],
    upfront_materialfee: ['', Validators.required],
    enrollmentfee: ['', Validators.required],
    upfront_enrollmentfee: ['', Validators.required],
    coursefee_total: ['',Validators.required],
    status: ['', Validators.required],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.stdDetailsid = params['id'];
    });

    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.getCourse();
    console.log(this.courses);
    
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
        console.log(this.courses);
        
        this.courseTypes = [
          ...new Set(mergedCourses.map((course) => course.coursetypecode)),
        ];
      });

    this.courseFee
      .get('coursetype')
      ?.valueChanges.subscribe((coursetype) => {
        this.filteredCourses = this.courses.filter(
          (course) => course.coursetypecode === coursetype
        );
        console.log('Filtered Courses: ', this.filteredCourses);
        this.courseFee.get('status')?.setValue('1');
        this.courseFee.get('code')?.setValue(this.filteredCourses?.[0]?.code);
      });
  }

  selectionChangeOfCourseType(event: any) {
    this.initializeForm()
    console.log("Slected Course Type:::::::::::::::::::",event.value );

  }
async  onCourseSelection(e : any){
  
    console.log("Slected Course Name:::::::::::::::::::",e.value);
    let cCode = e.value
    let cList: any = []
    const url = '/studentapi/Student/CourseFeeList';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      cList =  res.data.list.filter(c => c.coursecode == cCode);
      console.log('Course Details: ', cList);
      this.courseFee.get('origin')?.patchValue(cList[0].origin)
      this.courseFee.get('upfronfee_total')?.patchValue(cList[0].upfronfee_total)
      this.courseFee.get('tutionfee')?.patchValue(cList[0].tutionfee)
      this.courseFee.get('upfront_tutionfee')?.patchValue(cList[0].upfront_tutionfee)
      this.courseFee.get('materialfee')?.patchValue(cList[0].materialfee)
      this.courseFee.get('upfront_materialfee')?.patchValue(cList[0].upfront_materialfee)
      this.courseFee.get('enrollmentfee')?.patchValue(cList[0].enrollmentfee)
      this.courseFee.get('upfront_enrollmentfee')?.patchValue(cList[0].upfront_enrollmentfee)
    });
  }
  initializeForm(){
    this.courseFee.get('origin')?.setValue('')
    this.courseFee.get('upfronfee_total')?.setValue('')
    this.courseFee.get('tutionfee')?.setValue('')
    this.courseFee.get('upfront_tutionfee')?.setValue('')
    this.courseFee.get('materialfee')?.setValue('')
    this.courseFee.get('upfront_materialfee')?.setValue('')
    this.courseFee.get('enrollmentfee')?.setValue('')
    this.courseFee.get('upfront_enrollmentfee')?.setValue('')
  }

  async updateCourseFee() {
    
    let formData = this.courseFee.value;
    formData.coursecode = this.editObj.coursecode;
    console.log(formData);
    const url = '/studentapi/Student/addCourseFeeList';
    const payload = {
      ...formData,
    };
    console.log("Payload: ", payload)
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      this.isEditFromEnable = false;
      this.getCourse();
      console.log(res, 'course add fee');
    } catch (err) {
      console.log(err);
    }
    this.courseFee.reset()
    this.resetAllfee();
  }
  //? Coures Fee Data Table Columns
  displayedColumns: string[] = ['id', 'coursetypecode', 'name', 'origin', 'tutionfee', 'materialfee', 'enrollmentfee', 'coursefee_total', 'upfronfee_total', 'status', 'action'];

  //? total course fee calculation
  totalCourseFee() {
    this.tutionFee = isNaN(this.toNumber(this.courseFee.get('tutionfee').value))?0:this.toNumber(this.courseFee.get('tutionfee').value);
    this.materialFee = isNaN(this.toNumber(this.courseFee.get('materialfee').value))?0:this.toNumber(this.courseFee.get('materialfee').value);
    this.enrollmentFee = isNaN(this.toNumber(this.courseFee.get('enrollmentfee').value))?0:this.toNumber(this.courseFee.get('enrollmentfee').value);
    this.coursefeeTotal = this.tutionFee + this.materialFee + this.enrollmentFee
    this.courseFee.get('coursefee_total').patchValue(this.coursefeeTotal.toFixed(2));
  }
  //? total upfront course fee calculation
  totalUpfrontCouresFee() {
    this.upfrontTutionFee = isNaN(this.toNumber(this.courseFee.get('upfront_tutionfee').value))?0:this.toNumber(this.courseFee.get('upfront_tutionfee').value);
    this.upfrontMaterialFee = isNaN(this.toNumber(this.courseFee.get('upfront_materialfee').value))?0:this.toNumber(this.courseFee.get('upfront_materialfee').value);
    this.upfrontEnrollmentFee = isNaN(this.toNumber(this.courseFee.get('upfront_enrollmentfee').value))?0:this.toNumber(this.courseFee.get('upfront_enrollmentfee').value);
    this.totalUpfrontFee = this.upfrontTutionFee + this.upfrontMaterialFee + this.upfrontEnrollmentFee
    this.courseFee.get('upfronfee_total').patchValue(this.totalUpfrontFee.toFixed(2));
  }
  //? reset all fee
  resetAllfee() {
    this.coursefeeTotal = 0;
    this.tutionFee = 0;
    this.materialFee = 0;
    this.enrollmentFee = 0;
    this.totalUpfrontFee = 0;
    this.upfrontTutionFee = 0;
    this.upfrontMaterialFee = 0;
    this.upfrontEnrollmentFee = 0;
  }
  //? edit action to form enable  
  editCourseFee(i: number) {
    this.isEditFromEnable = true;
    this.editObj = this.courses[i]; 
    console.log(this.editObj);
    this.editObj.coursefee_total = this.isNumber(this.toNumber(this.editObj.tutionfee) + this.toNumber(this.editObj.materialfee) + this.toNumber(this.editObj.enrollmentfee) + '') ? this.toNumber(this.editObj.tutionfee) + this.toNumber(this.editObj.materialfee) + this.toNumber(this.editObj.enrollmentfee) : '0';
    this.editObj.coursefee_total = this.isNumber(this.toNumber(this.editObj.tutionfee) + this.toNumber(this.editObj.materialfee) + this.toNumber(this.editObj.enrollmentfee)+'')?this.toNumber(this.editObj.tutionfee) + this.toNumber(this.editObj.materialfee) + this.toNumber(this.editObj.enrollmentfee):'0';
    this.courseFee.patchValue(this.editObj);
    this.courseFee.get('origin').patchValue(this.editObj.origin_code);
    this.courseFee.get('coursetype').patchValue(this.editObj.coursetypecode);
    this.courseFee.get('coursecode').patchValue(this.editObj.name);
  }
  //? convert string to number
  toNumber(value: string): number {
    return parseFloat(value);
  }
  isNumber(value: string): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
  }
  selectedItem: any;
  selectRow(item: any) {
    this.selectedItem = item;
  }
}

