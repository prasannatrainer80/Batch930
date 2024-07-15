import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { APICallService } from '@core';
import { AuthService } from '@core/service/auth.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-client-admin-dashboard',
  templateUrl: './client-admin-dashboard.component.html',
  styleUrls: ['./client-admin-dashboard.component.scss'],
})
export class ClientAdminDashboardComponent implements OnInit {
  breadscrums: any[] = [
    {
      title: 'Dashboard',
      items: [
        {
          title: 'Client Admin',
        },
      ],
      active: 'Dashboard',
    },
  ];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  totalCountofStudents: number;
  clientId: any;
  campusName: string = '';
  campusId: any;

  allUsersObj: any = {};
  allusersArray: any;
  allusersRolesEchartDataArray: any;
  accountsCount!: any;
  agentCount: string = '';
  clientAdminCount: number;
  dosElicosCount: any;
  dosCount: any;
  itCount: any;
  marketingCount: any;
  offerCount: any;
  studentServiceCount: any;
  subAdminCount: any;
  superAdminCount: any;
  teacherCount: any;
  chartdata: any;

  roleId: any;
  apiService = inject(APICallService);
  authService = inject(AuthService);
  selectedValue: any = 0;

  rolesChartOption: EChartsOption = {};
  courseChartOption: EChartsOption = {};
  totalstudentsappliedListChartOption: EChartsOption = {};
  feePendingChartOption: EChartsOption = {};
  feesChartOption: EChartsOption = {};
  assignmentsChartOption: EChartsOption = {};
  attendenceChartOption: EChartsOption = {};

  studentsDetails: any;
  stdFiles: any;
  courses: any;
  ngOnInit(): void {

    this.AllDetCumulative()
    this.getFeesChart()
    this.getAssignmentsChart();
    this.loadData();
    this.GetAllUsersCount();
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.selectedValue = this.allusersArray?.[0];
  }




  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];
      const item = list?.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async AllDetCumulative() {
    const url = '/studentapi/Student/AllDetCumulative';
    const payload = {}

    try {
      const apiCall = await this.apiService.post(url, payload).toPromise();
      this.chartdata = apiCall.data.previewdata
      console.log(this.chartdata)


      //  course Chart Option data 
      let coursewiseCumulativeList = this.chartdata.coursewiseCumulativeList
      let courseCode = coursewiseCumulativeList.map((item) => item.coursecode)
      // let coursename = coursewiseCumulativeList.map((item) => item.name)
      let Totalstudentsuse = coursewiseCumulativeList.map((item) => {
        return {
          value: item.Totalstudentsuse, name: item.name
        }
      })
      console.log(Totalstudentsuse)

      this.courseChartOption = {
        xAxis: {
          type: 'category',
          data: courseCode,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            rotate: 5, // Rotate the labels by 45 degrees
            interval: 0  // Show all labels
          }
        },
        yAxis: {
          type: 'value'
        },
        toolbox:{
          show:true
        },
        textStyle:{
          fontFamily:"Roboto",
          fontSize: 8,
          fontStyle: "normal",
          fontWeight: "normal"
        },
        tooltip: {
          show:true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '{b}<br />{a}{c}'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        series: [
          {
            name: "No. of Students :",

            barWidth: '60%',

            data: Totalstudentsuse,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            label: {
              show: true
            }
          }
        ]
      };
      //  total   students applied List Chart Option data 
      let totalstudentsappliedList = this.chartdata.totalstudentsappliedList
      let status_description = totalstudentsappliedList.map((item) => item.statusdescription)
      let TotalstudentsList = totalstudentsappliedList.map((item) => item.total)

      this.totalstudentsappliedListChartOption = {
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

      //  Attendence Chart Option data 
      let AttendenceCumulativeList = this.chartdata.AttendenceCumulativeList
      let AttcourseCode = AttendenceCumulativeList.map((item) => item.coursecode)
      let presentdays = AttendenceCumulativeList.map((item) => item.presentdays)
      this.attendenceChartOption = {
        xAxis: {
          type: 'category',
          data: AttcourseCode,
          axisLabel: {
            rotate: 45, // Rotate the labels by 45 degrees
            interval: 0  // Show all labels
          }

        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: presentdays,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            label: {
              show: true
            }
          }
        ]
      };

      //  Fees pending  Chart Option data 
      let FeePendingCumulativeList = this.chartdata.FeePendingCumulativeList
      let feecourseCode = FeePendingCumulativeList.map((item) => item.coursecode)
      let totalfeepending = FeePendingCumulativeList.map((item) => item.totalfeepending)
      this.feePendingChartOption = {
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
      console.log(err)
    }
  }
  async GetAllUsersCount() {
    const url = '/appapi/User/GetAllUsersCount';
    const payload = {};

    this.apiService.post(url, payload).subscribe({
      next: (res: any) => {
        this.allUsersObj = res.data.list[0];

        this.allusersArray = Array.from(Object.entries(this.allUsersObj)).map(
          ([key, value]) => ({
            headingValue: key.slice(0, -4).split('_').join(' '),
            titlevalue: value,
            getallusersTitle: key,
          })
        );

        this.accountsCount = res.data.list[0].Accounts_cnt;
        this.agentCount = res.data.list[0].Agent_cnt;
        this.clientAdminCount = res.data.list[0].Client_Admin_cnt;
        this.dosElicosCount = res.data.list[0].DOS_ELICOS_cnt;
        this.dosCount = res.data.list[0].DOS_cnt;
        this.itCount = res.data.list[0].IT_cnt;
        this.marketingCount = res.data.list[0].Marketing_cnt;
        this.offerCount = res.data.list[0].Offer_cnt;
        this.studentServiceCount = res.data.list[0].Student_Services_cnt;
        this.subAdminCount = res.data.list[0].Sub_Admin_cnt;
        this.superAdminCount = res.data.list[0].Super_Admin_cnt;
        this.teacherCount = res.data.list[0].Teacher_cnt;

        this.rolesChartOption = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            left: 'auto',
            orient: 'vertical',
          },
          series: [
            {
              name: 'Role with Count',
              type: 'pie',
              radius: ['30%', '60%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: true,
                position: 'inside',
                formatter: '{c}'
              },




              emphasis: {
                label: {
                  show: true,
                  fontSize: 17,
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                {
                  name: 'Super Admin',
                  value: this.superAdminCount,
                },
                {
                  name: 'Sub Admin',
                  value: this.subAdminCount,
                },
                {
                  name: 'Accounts',
                  value: this.accountsCount,
                },
                {
                  name: 'Client Admin',
                  value: this.clientAdminCount,
                },
                {
                  name: 'IT',
                  value: this.itCount,
                },
                {
                  name: 'Marketing',
                  value: this.marketingCount,
                },
                {
                  name: 'Offer',
                  value: this.offerCount,
                },
                {
                  name: 'Student Services',
                  value: this.studentServiceCount,
                },
                {
                  name: 'Teacher',
                  value: this.teacherCount,
                },
                {
                  name: 'DOS',
                  value: this.dosCount,
                },
                {
                  name: 'DOS ELICOS',
                  value: this.dosElicosCount,
                },
                {
                  name: 'Agent',
                  value: this.agentCount,
                },
              ],
            },
          ],
        };
      },
      error: (err: any) => {
        console.log(err);
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


  async getAssignmentsChart() {
    // Prepare unitsChartOption
    this.assignmentsChartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
  }

}
