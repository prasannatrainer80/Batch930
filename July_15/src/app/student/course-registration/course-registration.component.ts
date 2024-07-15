import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService, CommonService } from '@core';

@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss'],
})
export class CourseRegistrationComponent implements OnInit {
  submitEffect: boolean = false;
  shimmerEffect: boolean = false;
  moduleName: any = 'studentreg';
  itemCode: any = '';
  customActionURL: string = '/adminapi/';
  cancelURL: string = '/studentreg/list';

  breadscrums: any[] = [
    {
      title: 'Approve',
      items: [
        {
          title: 'Course Registrations',
          url: '/studentreg/list',
        },
      ],
      active: 'Approve',
    },
  ];

  constructor(
    private common: CommonService,
    private apiCall: APICallService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.shimmerEffect = true;
      this.itemCode = params.get('code') || '';
    });
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.apiCall.post(`/dataapi/module/get`, { module: this.moduleName, code: this.itemCode }).subscribe((itemData: any) => {
      if (!this.common.isEmptyObj(itemData?.data)) {

        console.log(itemData?.data);

      }
    });
  }

}
