import { Component, inject, OnInit } from '@angular/core';
import { APICallService, AuthService } from '@core';

@Component({
  selector: 'app-std-payment',
  templateUrl: './std-payment.component.html',
  styleUrls: ['./std-payment.component.scss']
})
export class StdPaymentComponent implements OnInit{
  breadscrums = [
    {
      title: 'Accounts',
      items: [{ title: 'Student Payments' }],
      active: 'Student Payments',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);
  clientId: any;
  campusName: string = '';
  campusId: any;
  roleId: any;
  ngOnInit(): void {
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData()
  }

  async loadData() {
    const url = '/studentapi/Student/AllCampusList';
    const payload = {};
    try {
      const res: any = await this.apiService.post(url, payload).toPromise();
      const list = res.data['list'];
      console.log("LIST: ", list)
      const item = list.find((item) => item.id === this.clientId);
      if (item) {
        this.campusName = item.name;
        this.campusId = item.id;
      }
      console.log("Campus Name: ", this.campusName)
    } catch (err) {
      console.log(err);
    }
  }




}
