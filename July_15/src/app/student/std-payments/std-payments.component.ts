import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { forkJoin, map } from 'rxjs';

interface ButtonData {
  icon: string;
  tooltip: string;
  selected?: boolean
  route?: string; // Optional route path for the button
}


@Component({
  selector: 'app-std-payments',
  templateUrl: './std-payments.component.html',
  styleUrls: ['./std-payments.component.scss'],
})
export class StdPaymentsComponent implements OnInit {
  //brad crumbs and campus constans for all pages starts here
  studentId: any;
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;

  //brad crumbs and campus constans for all pages ends here

  myChart: any;
  panel2Expanded = true;
  feeChartOption: any;
  feeTabledataSource: any;
  PaymentDetailsInstalmentSource: any = [];

  //student fee
  materalFeeDataSource: any = [];
  tutionfeeDataSource: any = [];
  enrollmentfeeDataSource: any = [];
  upfrontfeeDataSource: any = [];

  //paid student fee 
  paidMaterialRes_datasource: any = [];
  paidTutionRes_datasource: any = [];
  paidEnrolmentRes_datasource: any = [];
  paidUpfrontRes_datasource: any = [];


  paymentScheduledataSource: any;
  feeStructureSource: any;
  paidPaymentListdataSource: any;
  completeStudentData: any;

  paymentDetailedList: any = [];

  materialfee: any = [];
  tutionfee: any = [];
  enrollmentfee: any = [];
  Studentcourseslist: any = []; // lis of cources  array of objects
  studentappliedcoursesList_datasource: any = [];

  feesChartOption: EChartsOption = {};

  upfrontfee: any = [];

  loading = false;
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', route: 'studentProfile' },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail' },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments', selected: true },
  ];



  breadscrums = [
    {
      title: 'StudentPayments',
      items: [{ title: 'Student Management' }],
      active: 'StudentPayments',
    },
  ];
  constructor(private route: ActivatedRoute, private router: Router) { }

  //dynamic data

  materialfeeColumns: string[] = [
    'instalno',
    'materialfeedescription',
    'materialfee',
    'duedate',
  ];
  tutionfeeColumns: string[] = [
    'instalno',
    'tutionfeedescription',
    'tutionfee',
    'duedate',
  ];
  enrollmentfeeColumns: string[] = [
    'instalno',
    'enrollmentdescription',
    'enrollmentfee',
    'duedate',
  ];
  upfrontfeeColumns: string[] = [
    'instalno',
    'upfrontfeedescription',
    'upfrontfee',
    'duedate',
  ];

  // paid student columns 
  paidmaterialfeeColumns: string[] = [
    'invno',
    'invdate',
    'instal_material_fee',
    'paidfee',
    'remainingfee',
    'status',
  ];
  paidtutionfeeColumns: string[] = [
    'invno',
    'invdate',
    'instal_tution_fee',
    'paidfee',
    'remainingfee',
    'status',
  ];
  paidenrollmentfeeColumns: string[] = [
    'invno',
    'invdate',
    'instal_enrollment_fee',
    'paidfee',
    'remainingfee',
    'status',
  ];
  paidupfrontfeeColumns: string[] = [
    'invno',
    'invdate',
    'instal_upfront_fee',
    'paidfee',
    'remainingfee',
    'status',
  ];


  paymentDetailsColumns: string[] = [
    'instalno',
    'id',
    'name',
    'paymentstatus',
    'tutionfee',
    'materialfee',
    'enrollmentfee',
    'upfrontfee',
    'duedate',
  ];

  //static data
  paymentScheduledisplayedColumns: string[] = [
    'invid',
    'invno',
    'due_date',
    'tution_fee',
    'material_fee',
    'tution_fee_paid',
    'material_fee_paid',
  ];
  paidPaymentListColumns: string[] = [
    'tran_no',
    'invid',
    'receipt_no',
    'student_id',
    'paid_date',
    'bank_deposit',
    'deposit_date',
    'payment_mode',
  ];

  studentappliedcoursesList_displayedColumns: string[] = [
    // 'coursecode',
    'ctypecode',
    'name',
    // 'intakecode',
    // 'duration',
    'startdate',
    'coursefinishdate',
    'tutionfee',
    'materialfee',
    'enrollmentfee',
    'status'
    // 'closedate',
  ];
  feestructure_displayedColumns: string[] = [
    'fee',
    'actual',
    'invoice',
    'paid',
    'pending',
  ];


  apiService = inject(APICallService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();



    // this.feeTabledataSource = feeTable_Summary;

    this.paymentScheduledataSource = paymentSchedule_summary;
    this.feeStructureSource = feeStructure_summary;
    // this.paidPaymentListdataSource = paidPaymentList_summary;


    this.getFeesChart()

    this.studentpaymentDetailedList();
    this.materalFeeList();
    this.tutionFeeList();
    this.enrollmentFeeList();
    this.upfrontFeeList();
    this.AllCourseList();


    this.getStudentWiseFeePaidDetails()
    // this.paidMaterial()
    // this.paidTution()
    // this.paidEnrolment()
    // this.paidUpfront()



  }
  ngAfterViewInit(): void {


    // this.initAssignmentChart();
  }


  // backToStdProfile() {
  //   this.router.navigate(['/student/studentProfile'], {
  //     queryParams: { id: this.studentId },
  //   });
  // }
  onButtonClick(button: ButtonData) {

    if (button.route) {
      this.router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }
  private _formBuilder = inject(FormBuilder)
  courseFiled = this._formBuilder.group({
    course: [''],


  })

  async getStudentWiseFeePaidDetails() {
    const paidMaterial = '/studentapi/Student/studentpaidmaterialfee';
    const paidTution = '/studentapi/Student/studentpaidtutionfee';
    const paidEnrolment = '/studentapi/Student/studentpaidenrollmentfee';
    const paidUpfront = '/studentapi/Student/studentpaidupfrontfee';
    const payload = {
      code: this.studentId,
    };

    forkJoin([
      this.apiService.post(paidMaterial, payload),
      this.apiService.post(paidTution, payload),
      this.apiService.post(paidEnrolment, payload),
      this.apiService.post(paidUpfront, payload),
    ])
      .pipe(
        map(([paidMaterial, paidTution, paidEnrolment, paidUpfront]) => {
          const paidMaterialRes = paidMaterial.data?.list;
          const paidTutionRes = paidTution.data?.list;
          const paidEnrolmentRes = paidEnrolment.data?.list;
          const paidUpfrontRes = paidUpfront.data?.list;



          this.paidMaterialRes_datasource = paidMaterialRes
          this.paidTutionRes_datasource = paidTutionRes
          this.paidEnrolmentRes_datasource = paidEnrolmentRes
          this.paidUpfrontRes_datasource = paidUpfrontRes


          console.log('paidMaterialRes: ', paidMaterialRes);
          console.log('paidTutionRes: ', paidTutionRes);
          console.log('paidEnrolmentRes: ', paidEnrolmentRes);
          console.log('paidUpfrontRes: ', paidUpfrontRes);


        })
      )
     


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


  // async paidEnrolment() {
  //   const studentenrollmentfee_URL = '/studentapi/Student/studentenrollmentfee';
  //   const payload = {
  //     code: this.studentId,
  //   };

  //   await this.apiService.post(studentenrollmentfee_URL, payload).subscribe({
  //     next: (res: any) => {

  //       const enrollmentfee_res = res?.data?.list;
  //       this.enrollmentfeeDataSource = enrollmentfee_res;


  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
  // async paidUpfront() {
  //   const studentupfrontfee_URL = '/studentapi/Student/studentupfrontfee';
  //   const payload = {
  //     code: this.studentId,
  //   };

  //   await this.apiService.post(studentupfrontfee_URL, payload).subscribe({
  //     next: (res: any) => {

  //       const upfrontfee_res = res?.data?.list;
  //       this.upfrontfeeDataSource = upfrontfee_res;


  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
  // async paidTution() {
  //   const studenttutionfee_URL = '/studentapi/Student/studenttutionfee';
  //   const payload = {
  //     code: this.studentId,
  //   };

  //   await this.apiService.post(studenttutionfee_URL, payload).subscribe({
  //     next: (res: any) => {

  //       const tutionfee_res = res?.data?.list;
  //       this.tutionfeeDataSource = tutionfee_res;


  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }
  // async paidMaterial() {
  //   const studentmaterialfee_URL = '/studentapi/Student/studentmaterialfee';
  //   const payload = {
  //     code: this.studentId,
  //   };

  //   await this.apiService.post(studentmaterialfee_URL, payload).subscribe({
  //     next: (res: any) => {

  //       const materialfee_res = res?.data?.list;
  //       this.materalFeeDataSource = materialfee_res;

  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }




  async enrollmentFeeList() {
    const studentenrollmentfee_URL = '/studentapi/Student/studentenrollmentfee';
    const payload = {
      code: this.studentId,
    };

    await this.apiService.post(studentenrollmentfee_URL, payload).subscribe({
      next: (res: any) => {

        const enrollmentfee_res = res?.data?.list;
        this.enrollmentfeeDataSource = enrollmentfee_res;


      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  async upfrontFeeList() {
    const studentupfrontfee_URL = '/studentapi/Student/studentupfrontfee';
    const payload = {
      code: this.studentId,
    };

    await this.apiService.post(studentupfrontfee_URL, payload).subscribe({
      next: (res: any) => {

        const upfrontfee_res = res?.data?.list;
        this.upfrontfeeDataSource = upfrontfee_res;


      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  async tutionFeeList() {
    const studenttutionfee_URL = '/studentapi/Student/studenttutionfee';
    const payload = {
      code: this.studentId,
    };

    await this.apiService.post(studenttutionfee_URL, payload).subscribe({
      next: (res: any) => {

        const tutionfee_res = res?.data?.list;
        this.tutionfeeDataSource = tutionfee_res;


      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  async materalFeeList() {
    const studentmaterialfee_URL = '/studentapi/Student/studentmaterialfee';
    const payload = {
      code: this.studentId,
    };

    await this.apiService.post(studentmaterialfee_URL, payload).subscribe({
      next: (res: any) => {

        const materialfee_res = res?.data?.list;
        this.materalFeeDataSource = materialfee_res;

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  async AllCourseList() {
    const url = '/studentapi/Student/studentpreviewdata';
    const payload = {
      code: this.studentId,
    };
    await this.apiService.post(url, payload).subscribe({
      next: (res: any) => {

        this.completeStudentData = res?.data?.previewdata?.studentInfo;

        this.Studentcourseslist = res?.data?.previewdata?.courseslist;

        this.studentappliedcoursesList_datasource = this.Studentcourseslist;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });



  }
  async studentpaymentDetailedList() {
    const studentpaymentDetailedList_URL =
      '/studentapi/Student/studentpaymentDetailedList';
    const payload = {
      code: this.studentId,
    };

    await this.apiService
      .post(studentpaymentDetailedList_URL, payload)
      .subscribe({
        next: (res: any) => {

          const paymentDetailedList_res = res?.data?.list;
          this.PaymentDetailsInstalmentSource = paymentDetailedList_res;

        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  async getFeesChart() {
    // There should not be negative values in rawData
    const rawData = [
      [100, 302,],
      [320, 132,],

    ];
    const totalData: number[] = [];
    for (let i = 0; i < rawData[0].length; ++i) {
      let sum = 0;
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i];
      }
      totalData.push(sum);
    }

    const grid = {
      left: 40,
      right: 40,
      top: 30,
      bottom: 30
    };

    const series: echarts.BarSeriesOption[] = [
      'Pending',
      'Paid',

    ].map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
        },
        data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        )
      };
    });
    return this.feesChartOption = {
      legend: {
        selectedMode: false
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['DLM', 'ALM',]
      },
      color: ["#FF0000", "#00FF00"],
      series
    };

  }




  getFeeChartOption() {
    // There should not be negative values in rawData
    const rawData = [
      [100, 302,],
      [320, 132,],

    ];
    const totalData: number[] = [];
    for (let i = 0; i < rawData[0].length; ++i) {
      let sum = 0;
      for (let j = 0; j < rawData.length; ++j) {
        sum += rawData[j][i];
      }
      totalData.push(sum);
    }

    const grid = {
      left: 40,
      right: 40,
      top: 30,
      bottom: 30
    };

    const series: echarts.BarSeriesOption[] = [
      'Pending',
      'Paid',

    ].map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
        },
        data: rawData[sid].map((d, did) =>
          totalData[did] <= 0 ? 0 : d / totalData[did]
        )
      };
    });
    return {
      legend: {
        selectedMode: false
      },
      grid,
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: ['DLM', 'ALM',]
      },
      color: ["#FF0000", "#00FF00"],

      series
    };
  }
}

// dummy Data
export interface feeElement {
  typeOfData: string;
  Actual_Fee: string;
  Invoice_Amount: string;
  Paid: string;
  Pending: string;
}
export interface paymentScheduleElement {
  invid: string;
  invno: string;
  due_date: string;
  tution_fee: string;
  material_fee: string;
  tution_fee_paid: string;
  material_fee_paid: string;
}
export interface paymentScheduleElement {
  invid: string;
  invno: string;
  due_date: string;
  tution_fee: string;
  material_fee: string;
  tution_fee_paid: string;
  material_fee_paid: string;
}
export interface feeStructureElement {
  fee: string,
  actual: string,
  invoice: string,
  paid: string,
  pending: string,

}

const paymentSchedule_summary: paymentScheduleElement[] = [
  {
    invid: '2181',
    invno: '2401',
    due_date: '03-may-2024',
    tution_fee: '$500',
    material_fee: '$100',
    tution_fee_paid: '$300',
    material_fee_paid: '$100',
  },
  {
    invid: '2191',
    invno: '2402',
    due_date: '03-jume-2024',
    tution_fee: '$500',
    material_fee: '$100',
    tution_fee_paid: '0',
    material_fee_paid: '0',
  },
];
// const paidPaymentList_summary: paidPaymentListElement[] = [
//   {
//     tran_no: 'Tution Fee',
//     invid: 'ADIT',
//     receipt_no: 'Zodiac',
//     student_id: '20-1-2024',
//     paid_date: '20-7-2024',
//     bank_deposit: 'Zodiac',
//     deposit_date: '20-1-2024',
//     payment_mode: '20-7-2024',
//   },
//   {
//     tran_no: 'Tution Fee',
//     invid: 'ADIT',
//     receipt_no: 'Zodiac',
//     student_id: '20-1-2024',
//     paid_date: '20-7-2024',
//     bank_deposit: 'Zodiac',
//     deposit_date: '20-1-2024',
//     payment_mode: '20-7-2024',
//   },
// ];
const feeStructure_summary: feeStructureElement[] = [
  {
    fee: 'Tution Fee',
    actual: '$1000',
    invoice: '$5000',
    paid: '$3000',
    pending: '$2000',

  },
  {
    fee: 'Material Fee',
    actual: '$1000',
    invoice: '$300',
    paid: '$300',
    pending: '0',

  },
  {
    fee: 'Enrolment Fee',
    actual: '$350',
    invoice: '$350',
    paid: '$350',
    pending: '0',

  },

];