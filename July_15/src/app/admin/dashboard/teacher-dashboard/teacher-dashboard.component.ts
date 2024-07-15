import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent {

  campusName: string = '';
  campusId: any;
  roleId: any;
  clientId: any;
  breadscrums = [
    {
      title: 'Teachers',
      items: [{ title: 'Teachers Management' }],
      active: 'Teachers',
    },
  ];
  apiService = inject(APICallService);
  authService = inject(AuthService);

  constructor(private route: ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    
    this.roleId = this.authService.currentUserValue.roleId;
    this.clientId = this.authService.currentUserValue.clientId;
    this.loadData();
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
