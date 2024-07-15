import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import * as echarts from 'echarts';

//cource interface
interface Course {
  courseName: string;
  courseStatus?: number; // Optional
}
interface Fee {
  courseName: string;
  status: string;
  amount?: number;
}
interface Attendance {
  courseName: string;
  attendance: string;
}
interface Assignments {
  courseName: string;
  assignmentscore: number;
  assignmentStatus: string;
}

export interface CourseModal {
  offerId: number;
  courseName: string;
  agentName: string;
  startdate: string;
  enddate: string;
  actions: string;
}
export interface communicationSummary {
  data: string;
  type: string;
  status: string;
  subject: string;
  commentby: string;
}

const Course_details: CourseModal[] = [
  {
    offerId: 721,
    courseName: 'ADIT',
    agentName: 'Zodiac',
    startdate: '20-1-2024',
    enddate: '20-7-2024',
    actions: 'H',
  },
  {
    offerId: 721,
    courseName: 'Cert III',
    agentName: 'Zodiac',
    startdate: '20-1-2025',
    enddate: '20-7-2025',
    actions: 'H',
  },
];

const communication_Summary: communicationSummary[] = [
  {
    data: 'hey',
    type: 'ADIT',
    status: 'Zodiac',
    subject: '20-1-2024',
    commentby: '20-7-2024',
  },
  {
    data: 'hey',
    type: 'Cert III',
    status: 'Zodiac',
    subject: '20-1-2025',
    commentby: '20-7-2025',
  },
];
interface ButtonData {
  icon: string;
  tooltip: string;
  selected?: boolean
  route?: string; // Optional route path for the button
}
@Component({
  selector: 'app-std-profile',
  templateUrl: './std-profile.component.html',
  styleUrls: ['./std-profile.component.scss'],
})
export class StdProfileComponent implements OnInit {
  buttonData: ButtonData[] = [
    { icon: 'account_circle', tooltip: 'Profile', selected: true },
    { icon: 'email', tooltip: 'Email', route: 'stdEmail' },
    { icon: 'description', tooltip: 'Letter', route: 'stdLetter' },
    { icon: 'school', tooltip: 'Course', route: 'stdCourse' },
    { icon: 'checklist', tooltip: 'Checklist', route: 'stdChecklist' },
    { icon: 'assignment', tooltip: 'Result', route: 'stdResult' },
    { icon: 'pause', tooltip: 'Defer', route: 'stdDefer' },
    { icon: 'flag', tooltip: 'English Test', route: 'stdEnglishtest' },
    { icon: 'credit_card', tooltip: 'ID Card', route: 'stdIdcard' },
    { icon: 'calendar_today', tooltip: 'Attendance', route: 'stdAttendance' },
    { icon: 'payment', tooltip: 'Payments', route: 'stdPayments' },
  ];

  breadscrums = [
    {
      title: 'StudentProfile',
      items: [{ title: 'Student Management' }],
      active: 'StudentProfile',
    },
  ];





  displayedColumns: string[] = [
    'offerId',
    'courseName',
    'agentName',
    'startdate',
    'enddate',
  ];
  dataSource = Course_details;

  CommunicationSummarydisplayedColumns: string[] = [
    'data',
    'type',
    'status',
    'subject',
    'commentby',
  ];
  studentappliedcoursesList_displayedColumns: string[] = [
    'coursecode',
    'ctypecode',
    'name',
    'intakecode',
    // 'duration',
    // 'startdate',
    // 'coursefinishdate',
    'tutionfee',
    'materialfee',
    'enrollmentfee',
    // 'closedate',
  ];

  // Sample data start
  courseData: Course[] = [
    {
      courseName: 'CERT III',

      courseStatus: 58,
    },
    { courseName: 'ADIT', courseStatus: 78 },
    {
      courseName: 'CERT IV',

      courseStatus: 98,
    },
  ];
  fee: Fee[] = [
    {
      courseName: 'VET',
      status: 'Complete',
    },
    // {
    //   courseName: 'ADIT',
    //   status: 'Pending',
    //   amount: 1,
    // },
    // {
    //   courseName: 'CERT III',
    //   status: 'Complete',
    //   amount: 1,
    // },

    // {
    //   courseName: 'DLM',
    //   status: 'Pending',
    //   amount: 1,
    // },
    // {
    //   courseName: 'ADIT',
    //   status: 'Complete',
    //   amount: 1,
    // },
    // {
    //   courseName: 'CERT III',
    //   status: 'Pending',
    //   amount: 1,
    // },
    // {
    //   courseName: 'DLM',
    //   status: 'Complete',
    //   amount: 1,
    // },
  ];

  attendance: Attendance[] = [
    { courseName: 'VET', attendance: '81' },
    { courseName: 'ELICOS', attendance: '60' },
    // { courseName: 'CERT III', attendance: '40' },
    // { courseName: 'ADIT', attendance: '80' },
    // { courseName: 'DLM', attendance: '90' },
  ];
  assignments: Assignments[];

  //Sample data ends
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;

  stdDetails: any = {};
  studentId: any;
  completeStudentData: any = {}; //object for only student details
  combinedStudentData: any = {}; //object for student details and its assignmaents array
  listofassignments: any; // assignmaents array of objects
  // studentappliedcoursesList: any = []; // lis of cources  array of objects
  Studentcourseslist: any = []; // lis of cources  array of objects
  loading = false;
  courseChartOption: any;
  assignmentChartOption: any;
  feeChartOption: any;
  attendanceChartOption: any;
  myChart: any;
  panel1Expanded = true;
  panel2Expanded = true;
  panel3Expanded = true;
  panel4Expanded = true;
  selectedCourse: any;
  data: any;


  studentpersonalInfo: any = {}
  statusdescription: any
  studentparams: any = []
  groupedData: any
  studentappliedcoursesList:any

  studentappliedcoursesList_datasource: any = [];
  apiService = inject(APICallService);
  authService = inject(AuthService);
  http = inject(HttpClient);
  constructor(private route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['id'];
    });
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.getstudentInfo();
    this.getCoursesbylist();
    



    this.courseChartOption = this.getEnrolledCourseChartOption();
    this.assignmentChartOption = this.getAssignmentChartOptions();
    this.feeChartOption = this.getFeeChartOption();
    this.attendanceChartOption = this.getAttendanceChartOption();



    this.initCourseChart();
    this.initFeeChart();
    this.initAttendanceChart();
    this.initAssignmentChart();



  }
  onButtonClick(button: ButtonData) {
    if (button.route) {
      this._router.navigate(['/student/', button.route], {
        queryParams: { id: this.studentId },
      });
    }
  }
  ngAfterViewInit(): void {
    // this.initCourseChart();
    // this.initFeeChart();
    // this.initAttendanceChart();
    // this.initAssignmentChart();
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


  // char options for New Course Enrolled Students
  getEnrolledCourseChartOption() {
    const colors = ['#5470C6', '#91CC75', '#EE6666', '#73C0DE', '#FAC858'];
    return {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        // formatter: (params) => {
        //   const courseIndex = params[0].dataIndex;
        //   const course = this.courseData[courseIndex];
        //   return `<b>${course.courseName}</b><br/><b>Count: </b>${
        //     course.studentCount || course.students.length
        //   }<br/><b>Students:</b><br/>${course.students.join('<br/>')}`;
        // },
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '2%',
        top: '5%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: this.courseData.map((course) => course.courseName),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.courseData.map((course, index) => ({
            value: course.courseStatus,
            itemStyle: { color: colors[index % colors.length] }, // Assign a color from the colors array
          })),
          type: 'bar',
          label: {
            // Optional: Display student names on hover
          },
        },
      ],
    };
  }
  getAssignmentChartOptions() {

    return {
      xAxis: {
        type: 'category',
        data: ['A1', 'A2', 'A3', 'A4']
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '2%',
        top: '5%',
        containLabel: true,
      },
      yAxis: {
        type: 'value'
      },
      color: "#fafbfa1",
      series: [
        {
          data: [120, 200, 150, 80],
          type: 'bar'
        }
      ]
    }
    // return {
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow',
    //     },
    //     formatter: (params) => {
    //       const AssignmentScore = params[0].value;
    //       return `Score: ${AssignmentScore} %`;
    //     },
    //   },
    //   grid: {
    //     left: '2%',
    //     right: '4%',
    //     bottom: '2%',
    //     top: '25%',
    //     containLabel: true,
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       data: this.assignments?.map((course) => course.courseName),
    //       axisTick: {
    //         alignWithLabel: true,
    //       },
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       type: 'value',
    //     },
    //   ],

    //   label: {
    //     show: true,
    //     formatter: (params: any) => params.value + '%',
    //   },
    //   series: [
    //     {
    //       name: 'Score:',
    //       type: 'bar',
    //       barWidth: '80%',
    //       data: this.assignments?.map((course) => ({
    //         value: course.assignmentscore,
    //         itemStyle: {
    //           color: this.assignments?.map((a) => a.assignmentscore < 80)
    //             ? 'orange'
    //             : 'green',
    //         },
    //       })),
    //     },
    //   ],
    // };
  }
  getFeeChartOption() {
    // There should not be negative values in rawData
    const rawData = [
      [10, 30],
      [90, 70],
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
      left: 20,
      right: 10,
      top: 30,
      bottom: 20,
    };

    const series: echarts.BarSeriesOption[] = ['Paid', 'pending'].map(
      (name, sid) => {
        return {
          name,
          type: 'bar',
          stack: 'total',
          barWidth: '80%',
          label: {
            show: true,
            formatter: (params: any) =>
              Math.round(params.value * 1000) / 10 + '%',
          },
          data: rawData[sid].map((d, did) =>
            totalData[did] <= 0 ? 0 : d / totalData[did]
          ),
        };
      }
    );
    return {
      legend: {
        selectedMode: true,
      },
      grid: grid,
      yAxis: {
        type: 'value',
      },
      xAxis: {
        type: 'category',
        data: ['Sub 1', 'Sub 2'],
      },
      series: series,
    };
  }

  getAttendanceChartOption() {
    const courseAttendanceMap = this.getCourseAttendanceMap();
    return {
      xAxis: {
        type: 'category',
        data: ['Sub 1', 'Sub 2']
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '2%',
        top: '25%',
        containLabel: true,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          barWidth: '80%',
          data: [260, 140],
          type: 'bar'
        }
      ]
    }

    // veera asked to change the pie chart to bar for attendence . 
    // return {
    //   title: {
    //     text: '',
    //     left: 'center',
    //   },
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: (params) => {
    //       const courseName = params.name;
    //       const students = this.attendance
    //         .filter((a) => a.courseName === courseName)
    //         .map((a) => ` ${a.attendance}%`)
    //         .join('<br>');
    //       return `${courseName}<br>${students}`;
    //     },
    //   },
    //   legend: {
    //     orient: 'horizontal',
    //     left: 'center',
    //     top: 'top',
    //     data: Object.keys(courseAttendanceMap),
    //   },
    //   series: [
    //     {
    //       name: 'Courses',
    //       type: 'pie',
    //       radius: '50%',
    //       data: Object.entries(courseAttendanceMap).map(
    //         ([courseName, attendanceSum]) => ({
    //           name: courseName,
    //           value: attendanceSum,
    //           itemStyle: {
    //             color: this.attendance.some(
    //               (a) => a.courseName === courseName && +a.attendance < 80
    //             )
    //               ? 'red'
    //               : undefined,
    //           },
    //         })
    //       ),
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)',
    //         },
    //       },
    //     },
    //   ],
    // };
  }
  getCourseAttendanceMap() {
    const courseAttendanceMap = {};
    this.attendance.forEach((a) => {
      if (!courseAttendanceMap[a.courseName]) {
        courseAttendanceMap[a.courseName] = 0;
      }
      courseAttendanceMap[a.courseName] += +a.attendance;
    });
    return courseAttendanceMap;
  }
  getStudentCountsByStatus(status: string): number[] {
    const courses = Array.from(
      new Set(this.fee.map((item) => item.courseName))
    );
    return courses.map((courseName) => {
      return this.fee
        .filter(
          (item) => item.courseName === courseName && item.status === status
        )
        .reduce((acc, item) => acc + (item.amount ?? 0), 0);
    });
  }

  initCourseChart() {
    const chartDom = document.getElementById('course-chart-o');
    if (chartDom) {
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.courseChartOption);
    }
  }
  initFeeChart() {
    const chartDom = document.getElementById('fee-chart-o');
    if (chartDom) {
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.feeChartOption);
    }
  }
  initAttendanceChart() {
    const chartDom = document.getElementById('attendance-chart-o');
    if (chartDom) {
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.attendanceChartOption);
    }
  }
  initAssignmentChart() {
    const chartDom = document.getElementById('assignment-chart-o');
    if (chartDom) {
      this.myChart = echarts.init(chartDom);
      this.myChart.setOption(this.assignmentChartOption);
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
        const groupedParams = this.studentparams?.reduce((acc, param) => {

          const { groupname, paramkey, paramval } = param;
          if (!acc[groupname]) {
            acc[groupname] = {};
          }
          acc[groupname][paramkey] = paramval;
          return acc;
        }, {});

        this.getstudentstatus() // to get the stausdescription based on status number 

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
  async getCoursesbylist() {
    const studentappliedcoursesList_URL =
      '/studentapi/Student/studentappliedcoursesList';
    const payload = {
      code: this.studentId,
    };
    await this.apiService
      .post(studentappliedcoursesList_URL, payload)
      .subscribe({
        next: (res: any) => {
        
          const studentappliedcoursesList = res?.data?.list;
          this.studentappliedcoursesList = studentappliedcoursesList;

          console.log(res.data.list);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }


}
