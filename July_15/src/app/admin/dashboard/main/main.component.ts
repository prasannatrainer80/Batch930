import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APICallService } from '@core';
import { AuthService } from '@core/service/auth.service';
import * as echarts from 'echarts';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('PieContainer', { static: true })  PieContainer!: ElementRef;
  breadscrums = [
    {
      title: 'Dashboad',
      items: [],
      active: 'Student Dashboard',
    },
  ];
  constructor(private _http: HttpClient, private _auth: AuthService) {
   //constructor
 }
 userDetails: any = {}
 clientId : any 
 campusName: string = ''
 campusId: any 
 maleCount : number
 femaleCount: number
 totalCount: number
 roleId: any;
  ngOnInit() {
    this.loadData()
    this.getCampusStdCount()
    this.roleId = this._auth.currentUserValue.roleId
    this.clientId = this._auth.currentUserValue.clientId
   
  }
  async loadData() {
    const body = {};
    try {
      const res: any = await this._http.request('POST', 'https://api.eduwebcamp.com/studentapi/Student/AllCampusList', {
        body: body
      }).toPromise();
      const list = res.data['list'];
      const item = list.find(item => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  async  getCampusStdCount(){
    await this.loadData();
   
    const newBody = {
        "id": this.campusId
      }
      
      this._http.request('POST','https://api.eduwebcamp.com/studentapi/Student/StudentsEnrolledCount', {body:  newBody}).subscribe({
          next: (res: any) => {
            this.femaleCount = res.data.list[0].Female_cnt
            this.maleCount = res.data.list[0].Male_cnt
            this.totalCount = res.data.list[0].totalRecords
          
          },
          error : (err:any) => {
            console.log(err)
          }
        })


  }

}
