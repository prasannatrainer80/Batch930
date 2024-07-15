import { Component, OnInit, inject } from '@angular/core';
import { APICallService, AuthService } from '@core';

@Component({
  selector: 'app-stdapi',
  templateUrl: './stdapi.component.html',
  styleUrls: ['./stdapi.component.scss'],
})
export class StdapiComponent implements OnInit {
  //response is coming
  allavailableagents: any;
  AllStudentsAssignments: any;
  AvailableCourses: any;
  allcoursenameswithcourseFee: any;
  CourseFeeList: any;

  studentmaterialfee: any;
  studentupfrontfee: any;
  studentenrollmentfee: any;
  studenttutionfee: any;
  StudentsautoIdNo: any;
  StudentsfeeDetails: any; // getting error
  studentpaidmaterialfee: any;

  studentappliedcoursesList: any;
  studentpaymentDetailedList: any;
  studentpaidupfrontfee: any;
  GetStudentsInformation: any;
  studentpaidenrollmentfee: any;
  studentpaidtutionfee: any;

  stdapi: any = [];

  stdApidetails() {
    return [
      {
        title: ' 39) studentpaidupfrontfee',
        data: this.studentpaidupfrontfee,
        url_studentpaidupfrontfee: '/studentapi/Student/studentpaidupfrontfee',
      },
    ];
  }

  //  --------------------------------------
  code: any = 'E240000100039';

  roleId: any;
  apiService = inject(APICallService);
  authService = inject(AuthService);

  // urls start

  //with code as header {"code": "E........."}

  url_studentpaidupfrontfee: any = '/studentapi/Student/studentpaidupfrontfee';
  url_studentpaidenrollmentfee: any =
    '/studentapi/Student/studentpaidenrollmentfee';
  url_studentpaidtutionfee: any = '/studentapi/Student/studentpaidtutionfee';
  url_studentpaidmaterialfee: any =
    '/studentapi/Student/studentpaidmaterialfee';

  url_studentpaymentDetailedList: any =
    '/studentapi/Student/studentpaymentDetailedList';
  url_studentappliedcoursesList: any =
    '/studentapi/Student/studentappliedcoursesList';
  url_GetStudentsInformation: any =
    '/studentapi/Student/GetStudentsInformation';
  url_StudentsAssignmentsById: any =
    '/studentapi/Student/StudentsAssignmentsById';
  url_StudentsfeeDetails: any = '/studentapi/Student/StudentsfeeDetails';

  //with empty header {}

  url_AllStudentsAssignments: any =
    '/studentapi/Student/AllStudentsAssignments';
  url_StudentsautoIdNo: any = '/studentapi/Student/StudentsautoIdNo';
  url_AvailableCourses: any = '/studentapi/Student/AvailableCourses';
  url_CourseFeeList: any = '/studentapi/Student/CourseFeeList';
  url_studentupfrontfee: any = '/studentapi/Student/studentupfrontfee';
  url_studentenrollmentfee: any = '/studentapi/Student/studentenrollmentfee';
  url_studenttutionfee: any = '/studentapi/Student/studenttutionfee';
  url_studentmaterialfee: any = '/studentapi/Student/studentmaterialfee';
  url_allcoursenameswithcourseFee: any =
    '/studentapi/Student/allcoursenameswithcourseFee';
  url_allavailableagents: any = '/studentapi/Student/allavailableagents';

  //urls end

  ngOnInit(): void {
    this.testApiInsteadOfPostMan();

    console.log(this.stdapi);
  }

  async testApiInsteadOfPostMan() {
    //allavailableagents
    this.apicallwithemptyHeader(this.url_allavailableagents);
    //allcoursenameswithcourseFee
    this.apicallwithemptyHeader(this.url_allcoursenameswithcourseFee);
    //url_AllStudentsAssignments
    this.apicallwithemptyHeader(this.url_AllStudentsAssignments);
    //CourseFeeList
    this.apicallwithemptyHeader(this.url_CourseFeeList);
    //AvailableCourses
    this.apicallwithemptyHeader(this.url_AvailableCourses);
    //StudentsautoIdNo
    this.apicallwithemptyHeader(this.url_StudentsautoIdNo);

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // /studentpaidupfrontfee
    this.apicallwithCodeHeader(this.url_studentpaidupfrontfee);
    // /GetStudentsInformation
    this.apicallwithCodeHeader(this.url_GetStudentsInformation);
    //studentpaidenrollmentfee
    this.apicallwithCodeHeader(this.url_studentpaidenrollmentfee);
    //studentpaidtutionfee
    this.apicallwithCodeHeader(this.url_studentpaidtutionfee);
    //studentpaidmaterialfee
    this.apicallwithCodeHeader(this.url_studentpaidmaterialfee);

    //studentmaterialfee
    this.apicallwithCodeHeader(this.url_studentmaterialfee);
    //studentupfrontfee
    this.apicallwithCodeHeader(this.url_studentupfrontfee);
    //studentenrollmentfee
    this.apicallwithCodeHeader(this.url_studentenrollmentfee);
    //studenttutionfee
    this.apicallwithCodeHeader(this.url_studenttutionfee);
    //StudentsfeeDetails
    this.apicallwithCodeHeader(this.url_StudentsfeeDetails);
    //studentappliedcoursesList
    this.apicallwithCodeHeader(this.url_studentappliedcoursesList);
    //studentpaymentDetailedList
    this.apicallwithCodeHeader(this.url_studentpaymentDetailedList);

    
  }

  //this is the pure function for calling api without header
  async apicallwithemptyHeader(url) {
    const apiurl = url;
    const payload8 = {};
    try {
      const res: any = await this.apiService.post(apiurl, payload8).toPromise();

      // AllStudentsAssignments
      if (apiurl.includes('AllStudentsAssignments')) {
        this.AllStudentsAssignments = res?.data?.list;
      }
      // allavailableagents
      if (apiurl.includes('allavailableagents')) {
        this.allavailableagents = res?.data?.list;
      }
      // AvailableCourses
      if (apiurl.includes('AvailableCourses')) {
        this.AvailableCourses = res?.data?.list;
      }
      // StudentsautoIdNo
      if (apiurl.includes('StudentsautoIdNo')) {
        this.StudentsautoIdNo = res?.data?.list;
      }

      // allcoursenameswithcourseFee
      if (apiurl.includes('allcoursenameswithcourseFee')) {
        this.allcoursenameswithcourseFee = res?.data?.list;
      }

      // CourseFeeList
      if (apiurl.includes('CourseFeeList')) {
        this.CourseFeeList = res?.data?.list;
      }
      this.stdapi = this.stdApidetails();
      console.log(this.stdapi);
    } catch (err) {
      console.log(err);
    }
  }
  //this is the pure function for calling api with header
  async apicallwithCodeHeader(url) {
    const apiurl = url;
    const payload8 = {
      code: this.code,
    };
    try {
      const res: any = await this.apiService.post(apiurl, payload8).toPromise();

      // studentmaterialfee
      if (apiurl.includes('studentmaterialfee')) {
        this.studentmaterialfee = res?.data?.list;
      }
      // studentpaidmaterialfee
      if (apiurl.includes('studentpaidmaterialfee')) {
        this.studentpaidmaterialfee = res?.data?.list;
      }
      // studentupfrontfee
      if (apiurl.includes('studentupfrontfee')) {
        this.studentupfrontfee = res?.data?.list;
      }
      // StudentsfeeDetails
      if (apiurl.includes('StudentsfeeDetails')) {
        res.code === 0
          ? (this.StudentsfeeDetails = res?.data?.list)
          : (this.StudentsfeeDetails = res?.message);
      }
      // studentappliedcoursesList
      if (apiurl.includes('studentappliedcoursesList')) {
        res.code === 0
          ? (this.studentappliedcoursesList = res?.data?.list)
          : (this.studentappliedcoursesList = res?.message);
      }
      // studentenrollmentfee
      if (apiurl.includes('studentenrollmentfee')) {
        this.studentenrollmentfee = res?.data?.list;
      }

      // studenttutionfee
      if (apiurl.includes('studenttutionfee')) {
        this.studenttutionfee = res?.data?.list;
      }

      // studentpaymentDetailedList
      if (apiurl.includes('studentpaymentDetailedList')) {
        this.studentpaymentDetailedList = res?.data?.list;
      }
      // GetStudentsInformation
      if (apiurl.includes('GetStudentsInformation')) {
        this.GetStudentsInformation = res?.data?.list;
      }
      // studentpaidupfrontfee
      if (apiurl.includes('studentpaidupfrontfee')) {
        this.studentpaidupfrontfee = res?.data?.list;
      }
      // studentpaidenrollmentfee
      if (apiurl.includes('studentpaidenrollmentfee')) {
        this.studentpaidenrollmentfee = res?.data?.list;
      }
      // studentpaidtutionfee
      if (apiurl.includes('studentpaidtutionfee')) {
        this.studentpaidtutionfee = res?.data?.list;
      }
      this.stdapi = this.stdApidetails();
      console.log(this.stdapi);
  
    } catch (err) {
      console.log(err);
    }
  }
}
