import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APICallService } from '@core';
import AOS from "aos";


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  appRefId: any
  isLanguageSpokenatHome_Field: any = false;
  isScore4Skills_Field: any = false;
  isScoreOverall_Field: any = false;
  languagesData: any = [];
  schoolingData: any = [];
  engtestsData: any = [];
  countries: any = [];
  stepid: any

  fromPreviewStep: any
  fromPrevious: any
  flagSE: string = 'N';
  flagLE: string = 'N';

  apiService = inject(APICallService)
  private _formBuilder = inject(FormBuilder)

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['stepid']) {
        this.appRefId = params['appRefId']
        this.stepid = params['stepid']
      }
      if (params['fromPreviewStep']) {
        this.fromPreviewStep = params['fromPreviewStep']
      }
      if (params['fromPrevious']) {
        this.fromPrevious = params['fromPrevious']
      }
      this.appRefId = params['appRefId']
      const appStatusString = params['appstatus']
      // if (appStatusString !== null) {
      // Guaranteed non-null string, safe to convert
      //   this.appStatus = parseFloat(appStatusString);
      //   this.appStatus = this.appStatus + 1
      // }
    })
  }
  ngOnInit(): void {

    AOS.init({
      duration: 3000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
    this.getAvailableGroupnameFromParamsSO();
    this.getAvailableGroupnameFromParamsLE();
    this.getAllAvailableEngTestsData();
    this.getAllAvailableSchoolingData();
    this.getAllLanguagesData();
    this.getCountries();
    this.transformResponse()
    

    console.log("AppStatus: ", this.appStatus)
    console.log("appRefId:", this.appRefId)
  }
  
  step2FormData: any = [];
  async transformResponse() {
    const url = '/studentapi/Student/getstudentparams';
    const payload = {
      "stepid": this.stepid,
      "code": this.appRefId
    };
    await this.apiService.post(url, payload).subscribe({
      next: (response: any) => {
        
        console.log("resfsd step2 ",response);
        this.step2FormData = response?.data?.previewdata?.studentparams;
        const transformedData = this.transform(response.data.previewdata.studentparams);
        this.patchFormParamValues(transformedData);
        console.log("tranformData step2",transformedData);

      }
    })
  }
  transform(studentParams: any[]) {
    console.log("Student Paramas: ", studentParams)
    const transformedData: any = {
      "Schooling&Employment": {
        highestschool: '',
        stillsecondary: 'Yes',

      },
      "Language&EnglishTest": {
        aboriginal: 'Yes',
        engmain: 'Yes',
        secondary: 'Yes',
        testenglish: 'Yes',
        testname: '',
        whencomplete: '',
        scoretype: 'overallonly',
        listeningscore: '',
        readingscore: '',
        writingscore: '',
        speakingscore: ''
      },

    };

    studentParams?.forEach(param => {
      console.log("PAAAAAAAAAAAAAARAAAAAAAAAAAAAM: ", param)
      if (param.groupname === 'Schooling&Employment') {
        transformedData['Schooling&Employment'][param.paramkey] = param.paramval;
      } else if (param.groupname === 'Language&EnglishTest') {
        transformedData['Language&EnglishTest'][param.paramkey] = param.paramval;
      }

    });

    return transformedData;
  }
  patchFormParamValues(data: any): void {
    console.log("DDDDDDDDDDDDDD:", data)
    console.log(data['Language&EnglishTest'].spokenhouse);

    const whenObject = new Date(data['Language&EnglishTest'].whencomplete)
    // const whenComplete = this.formatDateToMMDDYYYY(whenObject)
    // const whenComplete = this.convertToDate(whenObject)
    // this.englishtest.get('whencomplete').setValue(whenComplete);
    this.language.patchValue({
      aboriginal: data['Language&EnglishTest'].aboriginal,
      engmain: data['Language&EnglishTest'].engmain,
      spokenhouse: data['Language&EnglishTest'].spokenhouse,
      secondary: data['Language&EnglishTest'].secondary,
      testenglish: data['Language&EnglishTest'].testenglish

    });
    this.englishtest.patchValue({
      testname: data['Language&EnglishTest'].testname,
      whencomplete: new Date(data['Language&EnglishTest'].whencomplete),
      scoretype: data['Language&EnglishTest'].scoretype,
      listeningscore: data['Language&EnglishTest'].listeningscore,
      readingscore: data['Language&EnglishTest'].readingscore,
      writingscore: data['Language&EnglishTest'].writingscore,
      speakingscore: data['Language&EnglishTest'].speakingscore,
      overallscore: data['Language&EnglishTest'].overallscore
    });
    this.schooling.patchValue({
      highestschool: data['Schooling&Employment'].highestschool,
      stillsecondary: data['Schooling&Employment'].stillsecondary

    });
  }
  convertToDate(dateString: string): Date {
    return new Date(dateString);
  }
  formatDateToMMDDYYYY(date: Date): string {
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Adding leading zero if needed
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  // languageandculturalDiversityFormGroup
  language = this._formBuilder.group({
    aboriginal: ['Yes'],
    engmain: [''],
    spokenhouse: [''],
    secondary: ['Yes'],
    testenglish: ['Yes'],

  });

  englishtest = this._formBuilder.group({
    testname: [''],
    whencomplete: [null],
    scoretype: ['overallonly'],
    listeningscore: [''],
    readingscore: [''],
    writingscore: [''],
    speakingscore: [''],
    overallscore: [''],
  });

  schooling = this._formBuilder.group({
    highestschool: [''],
    stillsecondary: ['No'],
    // previousqualifications: ['', Validators.required],
    qualificationlevel: [''],
    qualificationname: [''],
    schoolinstutionname: [''],
    stateorcountry: [''],
    yearcompleted: [''],

  });

  employment = this._formBuilder.group({
    currentemploymentstatus: [''],
    // previousemployeehistory: [''], 
    employeer: [''],
    occiption: [''],
    durationto: [''],
    duties: [''],

  });

  appStatus: any
  selectionChangeOfScoreValue(event: any) {
    console.log(event.value);

    if (event.value == '4skills') {
      this.isScore4Skills_Field = true;
      this.isScoreOverall_Field = false;
    } else if (event.value == 'overallonly') {
      this.isScoreOverall_Field = true;
      this.isScore4Skills_Field = false;
    } else {
      this.isScore4Skills_Field = false;
      this.isScoreOverall_Field = false;
    }
  }



  transformToPayloadSchooling(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Schooling&Employment',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 2
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  transformToPayloadLanguage(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Language&EnglishTest',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 2
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  transformToPayloadEnglishTest(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Language&EnglishTest',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 2
        });
      }
    }
    console.log('Pay load: ', payload);
    return payload;
  }
  sendPayloadToBackend(payload: any[]): void {

    const apiUrl = '/studentapi/Student/studentparams';
    this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Payload sent successfully of language and test', response);
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );

  }
  updateappStatus() {

    this.appStatus = 2;
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate ';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
      status: 0
    };
    console.log("Updating status data: ", pLoad)
    this.apiService.post(apiUrl2, pLoad).subscribe((res: any) => {
      console.log("Status Update Response: ", res)
      if (this.fromPreviewStep) {
        this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
      }else {
        this._router.navigate(['/public/step3'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus,stepid:3 } })
      }
    });
  }
  async getCountries() {
    const url = '/studentapi/Student/availablecountries';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.countries = res.data.list;
      console.log('Countries List: ', this.countries);
    });
  }
 

  async gotoPreviewwithUpdate() {

    const step2URL = '/studentapi/Student/studentparamsupdate';
    this.englishtest.get('whencomplete').patchValue(new Date(this.englishtest.get('whencomplete').value).toLocaleDateString())
    const lformData = { ...this.language.value, ...this.englishtest.value };
    const languagePayload = this.transformToPayloadLanguage(lformData);
    console.log('transformed language Payload', languagePayload);
    try {
      await this.apiService.post(step2URL, languagePayload)
        .subscribe(
          (response) => {
            console.log('Update of Step 2 Sent successfully', response);
          },
          (error) => {
            console.error('Error sending payload', error);
          }
        );
    } catch (err) {
      console.log(err);
    }

    // this.sendPayloadToBackend(languagePayload);
    const formData = { ...this.schooling.value, ...this.employment.value };

    console.log('Schooling and Employment Update', formData);
    const schoolingPayload = this.transformToPayloadSchooling(formData);
    console.log('transformed schooling Payload', schoolingPayload);
    try {
      await this.apiService.post(step2URL, schoolingPayload)
        .subscribe(
          (response) => {
            console.log('Update of Step 2 Sent successfully', response);
            
            this.updateappStatus();
          },
          (error) => {
            console.error('Error sending payload', error);
          }
        );
    } catch (err) {
      console.log(err);
    }
    // this.sendPayloadToBackend(payload);

  }
  gotoStep1() {
    this._router.navigate(['/public/step1'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus - 1, stepid: 1, fromPrevious: true } })
  }

  async gotoStep3() {
    console.log(
      this.language.value,
      this.schooling.value,
      this.employment.value
    );

    if (this.flagLE == 'N' && this.flagSE == 'N') {
      const lformData = { ...this.language.value, ...this.englishtest.value };
      const languagePayload = this.transformToPayloadLanguage(lformData);
      this.sendPayloadToBackend(languagePayload);
      const formData = { ...this.schooling.value, ...this.employment.value };

      console.log('Schooling and Employment ', formData);
      const payload = this.transformToPayloadSchooling(formData);
      const apiUrl = '/studentapi/Student/studentparams';
      await this.apiService.post(apiUrl, payload).subscribe(
        (response) => {
          console.log('Payload sent successfully of language and test', response);
          this.updateappStatus();
        },
        (error) => {
          console.error('Error sending payload', error);
        }
      );
      // this.sendPayloadToBackend(payload);
    } else if(this.flagLE == 'Y' && this.flagSE == 'Y') {
      const step2URL = '/studentapi/Student/studentparamsupdate';
      this.englishtest.get('whencomplete').patchValue(new Date(this.englishtest.get('whencomplete').value).toLocaleDateString())
      const lformData = { ...this.language.value, ...this.englishtest.value };
      const languagePayload = this.transformToPayloadLanguage(lformData);
      console.log('transformed language Payload', languagePayload);
      try {
        await this.apiService.post(step2URL, languagePayload)
          .subscribe(
            (response) => {
              console.log('Update of Step 2 Sent successfully', response);
            },
            (error) => {
              console.error('Error sending payload', error);
            }
          );
      } catch (err) {
        console.log(err);
      }

      // this.sendPayloadToBackend(languagePayload);
      const formData = { ...this.schooling.value, ...this.employment.value };

      console.log('Schooling and Employment Update', formData);
      const schoolingPayload = this.transformToPayloadSchooling(formData);
      console.log('transformed schooling Payload', schoolingPayload);
      try {
        await this.apiService.post(step2URL, schoolingPayload)
          .subscribe(
            (response) => {
              console.log('Update of Step 2 Sent successfully', response);
              
              this.updateappStatus();
            },
            (error) => {
              console.error('Error sending payload', error);
            }
          );
      } catch (err) {
        console.log(err);
      }
    }
    

  }

  //! Accept only slash and numbers
  numberWishSlashOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 47) {
      return true;
    } else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



  selectFormValues(event: any, radioGroup: string) {

    if (radioGroup.toLocaleUpperCase() == 'ENGMAIN_YES') {
      this.isLanguageSpokenatHome_Field = false;
      
    } else if (radioGroup.toLocaleUpperCase() == 'ENGMAIN_NO') {
      this.isLanguageSpokenatHome_Field = true;
      
    }


    if (radioGroup.toLocaleUpperCase() == 'SCORETYPE_4SKILLS') {
      
      this.isScore4Skills_Field = true;
      this.isScoreOverall_Field = false;
    } else if (radioGroup.toLocaleUpperCase() == 'SCORETYPE_OVERALLONLY') {
      
      this.isScore4Skills_Field = false;
      this.isScoreOverall_Field = true;
    }

  }
  async getAllLanguagesData() {
    const url = '/studentapi/Student/languageslist';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.languagesData = res.data.list;
      console.log("languagesData ", res);

    });
  }
  async getAllAvailableSchoolingData() {
    const url = '/studentapi/Student/availablescholling';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.schoolingData = res.data.list;
      console.log("schoolingData ", res);

    });
  }
  async getAllAvailableEngTestsData() {
    const url = '/studentapi/Student/availableEngTests';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.engtestsData = res.data.list;
      console.log("engtestsData ", res);

    });
  }

  OnClickOfCancel() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: 4, stepid: 5 } })
  }
  async getAvailableGroupnameFromParamsSO() {
    const url = '/studentapi/Student/availablegroupname';
    const payload = {
      code: this.appRefId,
      groupname: 'Schooling&Employment',
      stepid:2
    };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      console.log("groupname available ",res);
      
      this.flagSE = res.data.recordsavailable;
    });
  }
  async getAvailableGroupnameFromParamsLE() {
    const url = '/studentapi/Student/availablegroupname';
    const payload = {
      code: this.appRefId,
      groupname: 'Language&EnglishTest',
      stepid:2
    };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      console.log("groupname available ",res);
      
      this.flagLE = res.data.recordsavailable;
    });
  }
}
