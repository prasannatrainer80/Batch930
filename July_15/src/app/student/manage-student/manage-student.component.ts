import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { APICallService } from '@core';
import { AuthService } from '@core/service/auth.service';
import { Subject, count } from 'rxjs';
import { StdProfileComponent } from '../std-profile/std-profile.component';
import { StdCourseDetailsComponent } from '../std-course-details/std-course-details.component';
import { StdCourseTimeTableDetailsComponent } from '../std-course-time-table-details/std-course-time-table-details.component';
import { StdAttandanceDetailsComponent } from '../std-attandance-details/std-attandance-details.component';
import { StdFeeDetailsComponent } from '../std-fee-details/std-fee-details.component';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.scss'],
})
export class ManageStudentComponent implements OnInit, AfterViewInit {

  // Sample data start
  chartOptions: any;
  paymentChartOptions: any;
  attendanceChartOptions: any;
  assignmentChartOptions: any;
  selectedQuarter: string = 'Q1';
  quarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  data = {
    Q1: { new: 50, completed: 30, withdrawn: 10, certificate: 5 },
    Q2: { new: 60, completed: 40, withdrawn: 15, certificate: 10 },
    Q3: { new: 70, completed: 50, withdrawn: 20, certificate: 15 },
    Q4: { new: 80, completed: 60, withdrawn: 25, certificate: 20 },
  };
  paymentData = {
    Q1: { total: 100, completed: 50, pending5K: 20, pending3K: 15, pending1K: 10 },
    Q2: { total: 110, completed: 60, pending5K: 25, pending3K: 20, pending1K: 15 },
    Q3: { total: 120, completed: 70, pending5K: 30, pending3K: 25, pending1K: 20 },
    Q4: { total: 130, completed: 80, pending5K: 35, pending3K: 30, pending1K: 25 },
  };
  attendanceData = {
    Q1: { lessThan80: 20, above80: 80 },
    Q2: { lessThan80: 30, above80: 70 },
    Q3: { lessThan80: 25, above80: 75 },
    Q4: { lessThan80: 15, above80: 85 },
  };
  assignmentData = {
    Q1: {
      VET: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 35, pending: 15 } },
      ELICOS: { subject1: { submitted: 30, pending: 20 }, subject2: { submitted: 45, pending: 5 } }
    },
    Q2: {
      VET: { subject1: { submitted: 10, pending: 40 }, subject2: { submitted: 25, pending: 15 } },
      ELICOS: { subject1: { submitted: 10, pending: 20 }, subject2: { submitted: 45, pending: 5 } }
    },
    Q3: {
      VET: { subject1: { submitted: 4, pending: 20 }, subject2: { submitted: 5, pending: 35 } },
      ELICOS: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 45, pending: 15 } }
    },
    Q4: {
      VET: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 30, pending: 5 } },
      ELICOS: { subject1: { submitted: 40, pending: 2 }, subject2: { submitted: 45, pending: 5 } }
    },
  }
  campusList :any

  // Sample data ends
  @ViewChild(MatPaginator) paginator: MatPaginator;
  breadscrums: any[] = [
    {
      title: 'Student',
      items: [
        {
          title: 'Student Management',
        },
      ],
      active: 'Student',
    },
  ];

  displayedColumns: string[] = [
    'code',
    'firstname',
    'dob',
    'emailid',
    'feespending',
    'totalfees',
    'feesPaid',
    'attendence',

    
    'actions',
  ];

  searchItems = [
    // {key: 'All', value: 'All'},
    { key: 'studentid', value: 'Student Id' },
    { key: 'firstname', value: 'First Name' },
    { key: 'middlename', value: 'Middle Name' },
    { key: 'lastname', value: 'Last Name' },
    { key: 'nickname', value: 'Nick Name' },
    { key: 'collegecode', value: 'College Code' },
    { key: 'coursetype', value: 'Course Type' },
    { key: 'emailid', value: 'Email' },
    { key: 'gender', value: 'Gender' },
    { key: 'origin', value: 'Origin' },
    { key: 'agent', value: 'Agent Name' }

  ]
  dataSource: any;
  private searchTerms = new Subject<string>();
  selectedItem: any;
  chartdata: any;
  searchKey: any;
  showDetails: boolean = false;
  clientId: any;
  campusName: string = '';
  campusId: any;
  totalCount: number;
  allstudents: [];
  roleId: any;
  apiService = inject(APICallService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);
  selectedStudent: any;
  http = inject(HttpClient)
  showData: boolean = false

  constructor(private router: Router, private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadData();
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.dataSource = new MatTableDataSource<any>([]);
    this.updateCharts();
    this.allcharts();

    
    this.getallStudents("All", "");


  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onQuarterChange(): void {
    
    this.updateCharts();
  }

  updateCharts(): void {
    this.updateStudentChart();
    // this.updatePaymentChart();
    this.updateAttendanceChart();
    this.updateAssignmentChart();
  }
  updateStudentChart(): void {
    const quarterData = this.data[this.selectedQuarter];

    // this.chartOptions = {
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow'
    //     }
    //   },
    //   legend: {
    //     data: ['Count']
    //   },
    //   xAxis: {
    //     data: ['New', 'Completed', 'Withdrawn', 'to be Issued'],
    //     axisLabel: {
    //       // Set rotate to 90 degrees for vertical labels
    //       rotate: 40
    //     }
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: 'Count',
    //     type: 'bar',
    //     data: [
    //       quarterData.new,
    //       quarterData.completed,
    //       quarterData.withdrawn,
    //       quarterData.certificate
    //     ],
    //     label: {
    //       show: true
    //     },
    //   }]
    // };
  }
  updatePaymentChart(): void {
    const quarterData = this.paymentData[this.selectedQuarter];

    // this.paymentChartOptions = {
    //   title: {
    //     text: ''
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'shadow'
    //     }
    //   },
    //   legend: {
    //     data: ['Count']
    //   },
    //   xAxis: {
    //     data: ['Total', 'On Track', 'Pending 5K', 'Pending 3K', 'Pending 1K'],
    //     axisLabel: {
    //       rotate: 45, // Rotate the labels by 45 degrees
    //       interval: 0  // Show all labels
    //     }
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: 'Count',
    //     type: 'bar',
    //     data: [
    //       {
    //         value: quarterData.total,
    //         // itemStyle: { color: 'blue' } // Color for total students
    //       },
    //       {
    //         value: quarterData.completed,
    //         itemStyle: { color: 'green' } // Color for completed payments
    //       },
    //       {
    //         value: quarterData.pending5K,
    //         itemStyle: { color: 'red' } // Color for pending 5K
    //       },
    //       {
    //         value: quarterData.pending3K,
    //         itemStyle: { color: 'orange' } // Color for pending 3K
    //       },
    //       {
    //         value: quarterData.pending1K,
    //         itemStyle: { color: 'yellow' } // Color for pending 1K
    //       }

    //     ],
    //     label: {
    //       show: true
    //     },

    //   }]
    // };
  }
  updateAttendanceChart(): void {
    const quarterData = this.attendanceData[this.selectedQuarter];

    this.attendanceChartOptions = {
      title: {
        text: '',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Attendance',
          type: 'pie',
          radius: '50%',
          data: [
            { value: quarterData.lessThan80, name: '<80%' },
            { value: quarterData.above80, name: '>80%' }
          ],
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.attendanceChartOptions.series[0].data[0].itemStyle = {
      color: 'red' // Change to your desired red color (e.g., '#FF0000')
    };
  }

  updateAssignmentChart(): void {
    const quarterData = this.assignmentData[this.selectedQuarter];
    const courses = Object.keys(quarterData);
    const subjects = Object.keys(quarterData[courses[0]]);

    interface AssignmentData {
      course: string;
      subject: string;
      submitted: number;
      pending: number;
    }

    const data: AssignmentData[] = [];

    for (const course of courses) {
      for (const subject of subjects) {
        data.push({
          course: course,
          subject: subject,
          submitted: quarterData[course][subject].submitted,
          pending: quarterData[course][subject].pending,
        });
      }
    }

    const series = subjects.flatMap(subject => [
      {
        name: `${subject} Submitted`,
        type: 'bar',
        stack: subject,
        data: data.filter(d => d.subject === subject).map(d => d.submitted),
        itemStyle: { color: 'green' },
        label: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      },
      {
        name: `${subject} Pending`,
        type: 'bar',
        stack: subject,
        data: data.filter(d => d.subject === subject).map(d => d.pending),
        itemStyle: { color: 'red' },
        label: {
          show: true,
          position: 'inside',
          formatter: '{c} %'
        }
      }
    ]);

    this.assignmentChartOptions = {
      title: {
        text: ''
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: { type: 'shadow' }
      // },
      // legend: {
      //   data: series.map(s => s.name)
      // },
      xAxis: {
        type: 'category',
        data: courses,
        axisLabel: {
          rotate: 45, // Rotate the labels by 45 degrees
          interval: 0  // Show all labels
        }
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
  }


  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];

      this.campusList =list
      const item = list.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async allcharts() {
    const url = '/studentapi/Student/allcharts';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res?.data?.previewdata
      this.chartdata = list
      console.log(this.chartdata)

      console.log(list)
//student Status Trends
      let totalstudentsappliedList = this.chartdata.totstuappstatuswiseList
      let status_description = totalstudentsappliedList.map((item) => item.statusdescription)
      let TotalstudentsList = totalstudentsappliedList.map((item) => item.total)

      this.chartOptions = {
        xAxis: {
          type: 'category',
          data: status_description,
          axisLabel: {
            rotate: 25, // Rotate the labels by 45 degrees
            interval: 0  // Show all labels
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: TotalstudentsList,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            color: ["#FFFAA0"],
            label: {
              show: true
            }
          }
        ]
      };
   


           //  Fees pending  Chart Option data 
           let FeePendingCumulativeList = this.chartdata.FeePendingCumulativeList
           let feecourseCode = FeePendingCumulativeList.map((item) => item.name.split(" ").map((x)=>x[0]).join(""))
           let totalfeepending = FeePendingCumulativeList.map((item) => item.totalfeepending)

           this.paymentChartOptions = {
             xAxis: {
               type: 'category',
               data: feecourseCode,
               axisLabel: {
                 rotate: 25, // Rotate the labels by 45 degrees
                 interval: 0  // Show all labels
               }
             },
             yAxis: {
               type: 'value'
             },
             series: [
               {
                 data: totalfeepending,
                 type: 'line',
                 label: {
                   show: true
                 }
               }
             ]
           };
     

     

    } catch (err) {
      console.log(err);
    }
  }

  async getallStudents(key: any, value: any) {
    const url = '/studentapi/Student/GetStudentsListByKey';

    const payload = {
      key: key,
      byval: value
    };

    this.apiService.post(url, payload).subscribe({
      next: (res: any) => {
        this.showData = true
        console.log("Studetn Details: ", res)
        this.allstudents = res.data.previewdata.studentpersonalInfo;
        console.log("ALL STUDENTS: ", this.allstudents)
        this.dataSource = new MatTableDataSource<any>(this.allstudents);
        this.cdr.detectChanges()
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource)
        this.totalCount = res.data.totalRecords;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onSearch(key: any, filterValue: any) {
    console.log("Key  ", key)
    console.log(" Value: ", filterValue)

    this.getallStudents(key, filterValue);
    this.showData = false
    if (this.searchKey)
      this.showData = true
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }
  onSearchClear() {
    this.searchKey = '';
  }
  showStudentDetails(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }
  onClose() {
    this.selectedItem = null;
    this.showDetails = false;
  }

  showStdProfile(element: any) {
    this.selectedStudent = element;
    this.router.navigate(['/student/studentProfile'], { queryParams: { id: this.selectedStudent.code } })
    // const matDialogConfig = new MatDialogConfig();
    // matDialogConfig.data = {
    //   data: this.selectedStudent,
    // };
    // matDialogConfig.width = '100%';
    // matDialogConfig.height = '700px'
    // // matDialogConfig.disableClose = true
    // matDialogConfig.autoFocus = true;
    // this.dialog.open(StdProfileComponent, matDialogConfig);
  }
  showStdCourseDetails() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      data: this.selectedStudent,
    };
    matDialogConfig.width = '100%';
    // matDialogConfig.disableClose = true
    matDialogConfig.autoFocus = true;
    this.dialog.open(StdCourseDetailsComponent, matDialogConfig);
  }
  showStdCourseTTDetails() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      data: this.selectedStudent,
    };
    matDialogConfig.width = '100%';
    // matDialogConfig.disableClose = true
    matDialogConfig.autoFocus = true;
    this.dialog.open(StdCourseTimeTableDetailsComponent, matDialogConfig);
  }
  showStdAttandanceDetails() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      data: this.selectedStudent,
    };
    matDialogConfig.width = '100%';
    // matDialogConfig.disableClose = true
    matDialogConfig.autoFocus = true;
    this.dialog.open(StdAttandanceDetailsComponent, matDialogConfig);
  }
  showStdFeeDetails() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.data = {
      data: this.selectedStudent,
    };
    matDialogConfig.width = '100%';
    // matDialogConfig.disableClose = true
    matDialogConfig.autoFocus = true;
    this.dialog.open(StdFeeDetailsComponent, matDialogConfig);
  }
}
