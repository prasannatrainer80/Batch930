import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import AOS from "aos";


@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component {
  groupedData: any;
  formattedData: any;
  courseList: any;
  selectedStudent: any;
  appRefId: any
  appStatus: any;

  //? Accordion Expand boolean
  isPEnable: boolean = false;
  isLEnable: boolean = false;
  isEEnable: boolean = false;
  isAEnable: boolean = false;
  

  apiService = inject(APICallService);
  authService = inject(AuthService);
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
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
      duration: 4000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
    

    this.getFormattedData();
    this.expandPanel('P');
  }

  
 

 async getFormattedData() {
    
    const url = '/studentapi/Student/studentpreviewdata';
    const payload = { code: this.appRefId };
    await this.apiService.post(url, payload).subscribe((res: any) => {
     
      const courseList = res?.data?.previewdata?.courseslist;
      this.courseList=courseList
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
     
      console.log('Group Paramssssssssssssssssss Data: ', this.groupedData);
    });
  }
  
  //! Expand Panel for Accordion
  expandPanel(text: string) {
    if (text.toLocaleUpperCase() == "P") {
      this.isPEnable = true;
      this.isLEnable = false;
      this.isEEnable = false;
      this.isAEnable = false;
    } else if (text.toLocaleUpperCase() == "L") {
      this.isPEnable = false;
      this.isLEnable = true;
      this.isEEnable = false;
      this.isAEnable = false;
    }else if (text.toLocaleUpperCase() == "E") {
      this.isPEnable = false;
      this.isLEnable = false;
      this.isEEnable = true;
      this.isAEnable = false;
    }
    else if (text.toLocaleUpperCase() == "A") {
      this.isPEnable = false;
      this.isLEnable = false;
      this.isEEnable = false;
      this.isAEnable = true;
    }
  }
  gotoStep1(){
    this._router.navigate(['/public/step1'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 1, } })
  }
  gotoStep2(){
    this._router.navigate(['/public/step2'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 2 ,} })
  }
  gotoStep3(){
    this._router.navigate(['/public/step3'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 3 ,} })
  }
  gotoStep4(){
    this._router.navigate(['/public/step4'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 4 , fromPrevious: true} })
  }
  gotostep6() {
    this._router.navigate(['/public/step6'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })

  }
  editPersonalInfo(){
    this._router.navigate(['/public/step1'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 1, fromPreviewStep: true } })
  }
  editLanguage(){
    this._router.navigate(['/public/step2'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 2 , fromPreviewStep: true } })

  }
  editEnrollment(){
    this._router.navigate(['/public/step3'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 3 , fromPreviewStep: true } })

  }
  editAditionalService(){
    this._router.navigate(['/public/step4'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus-1, stepid: 4 , fromPreviewStep: true } })

  }
}
