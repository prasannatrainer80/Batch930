import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import AOS from "aos";


@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss']
})
export class Step7Component {
  groupedData: any;
  formattedData: any;
  selectedStudent: any;

  appRefId: any
  appStatus: any
  apiService = inject(APICallService);
  authService = inject(AuthService);



  private _formBuilder = inject(FormBuilder)
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router

  ) {
    this._activatedRoute.queryParams.subscribe((params) => {

      this.appRefId = params['appRefId']
      const appStatusString = params['appstatus']
      if (appStatusString !== null) {
        // Guaranteed non-null string, safe to convert
        this.appStatus = parseFloat(appStatusString);
        this.appStatus = this.appStatus + 1
      }
    })

  }




  ngOnInit(): void {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });


    this.getFormattedData();
  }

  ngAfterViewInit(): void {
    // Disable previous steps after the view has been initialized

    this.getFormattedData();
  }
  Done(){
    this.updateappStatus()
    this._router.navigate(['/'])
  }

 async updateappStatus() {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
      status: 1
    };
    console.log("AppRef Id : ", this.appRefId)
    console.log("AppStatus: ", this.appStatus)
    console.log("AppStatus: ", this.appStatus)

    await this.apiService.post(apiUrl2, pLoad).subscribe();
  }







  gotostep6() {
    this._router.navigate(['/public/step6'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })

  }





  async getFormattedData() {
    const url = '/studentapi/Student/studentpreviewdata';
    const payload = { code: this.appRefId };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      const courseList = res?.data?.previewdata?.courseslist;
      const studentInfo = res?.data?.previewdata?.studentInfo;
      this.formattedData = res?.data?.previewdata?.studentparams;
      const groupedParams = this.formattedData?.reduce((acc, param) => {
        const { groupname, paramkey, paramval } = param;
        if (!acc[groupname]) {
          acc[groupname] = {};
        }
        acc[groupname][paramkey] = paramval;
        return acc;
      }, {});

      this.groupedData = {
        studentInfo: { ...studentInfo },
        courseList: { ...courseList },
        ...groupedParams,
      };
     
    });
  }
}
