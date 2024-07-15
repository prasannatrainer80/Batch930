import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent {
  campusName: string = '';
  campusId: any;
  roleId: any;
  clientId: any;
  showData: boolean = false

  breadscrums = [
    {
      title: 'Accounts Management',
      items: [{ title: 'Accounts Management' }],
      active: 'Accounts',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);


  // Sample data start
  chartOptions: any;
  paymentChartOptions: any;
  attendanceChartOptions: any;
  assignmentChartOptions: any;
  selectedQuarter: string = 'Q1';
  quarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  data = {
    Q1: { paid: 500, pending: 300,  },
    Q2: { paid: 600, pending: 400,  },
    Q3: { paid: 700, pending: 500, },
    Q4: { paid: 800, pending: 600,  },
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
  Q1: { VET: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 35, pending: 15 } },
    ELICOS: { subject1: { submitted: 30, pending: 20 }, subject2: { submitted: 45, pending: 5 } }
  },
  Q2: { VET: { subject1: { submitted: 10, pending: 40 }, subject2: { submitted: 25, pending: 15 } },
  ELICOS: { subject1: { submitted: 10, pending: 20 }, subject2: { submitted: 45, pending: 5 } }
},
Q3: { VET: { subject1: { submitted: 4, pending: 20 }, subject2: { submitted: 5, pending: 35 } },
ELICOS: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 45, pending: 15 } }
},
Q4: { VET: { subject1: { submitted: 40, pending: 10 }, subject2: { submitted: 30, pending: 5 } },
ELICOS: { subject1: { submitted: 40, pending: 2 }, subject2: { submitted: 45, pending: 5 } }
},
  }




  constructor(private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
    this.updateCharts();

  }
 onQuarterChange(): void {
    this.updateCharts();
  }

  updateCharts(): void {
    this.updateStudentChart();
    this.updatePaymentChart();
    this.updateAttendanceChart();
    this.updateAssignmentChart();
  }
  updateStudentChart(): void {
    const quarterData = this.data[this.selectedQuarter];

    this.chartOptions = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['fee']
      },
      xAxis: {
        data: ['Paid', 'pending'],
        axisLabel: {
          // Set rotate to 90 degrees for vertical labels
          rotate: 0
        }
      },
      yAxis: {
        axisLabel: {
          
          rotate: 40
        }
      },
      series: [{
        name: 'fee',
        type: 'bar',
        data: [
          quarterData.paid,
          quarterData.pending,
          // quarterData.withdrawn,
          // quarterData.certificate
        ]
      }]
    };
  }
  updatePaymentChart(): void {
    const quarterData = this.paymentData[this.selectedQuarter];

    this.paymentChartOptions = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Count']
      },
      xAxis: {
        data: ['Total', 'On Track', 'Pending 5K', 'Pending 3K', 'Pending 1K'],
        axisLabel: {
          rotate: 45, // Rotate the labels by 45 degrees
          interval: 0  // Show all labels
        }
      },
      yAxis: {},
      series: [{
        name: 'Count',
        type: 'bar',
        data: [
          {
            value: quarterData.total,
            // itemStyle: { color: 'blue' } // Color for total students
          },
          {
            value: quarterData.completed,
            itemStyle: { color: 'green' } // Color for completed payments
          },
          {
            value: quarterData.pending5K,
            itemStyle: { color: 'red' } // Color for pending 5K
          },
          {
            value: quarterData.pending3K,
            itemStyle: { color: 'orange' } // Color for pending 3K
          },
          {
            value: quarterData.pending1K,
            itemStyle: { color: 'yellow' } // Color for pending 1K
          }

        ],

      }]
    };
}
updateAttendanceChart(): void{
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
      const item = list.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

}
