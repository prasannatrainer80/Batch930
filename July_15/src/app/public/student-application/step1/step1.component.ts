import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService } from '@core';
import { Event, NavigationStart, NavigationEnd } from '@angular/router';
import AOS from "aos";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { helper } from 'echarts';
import { filter } from 'rxjs';
import { globalProperties } from '@shared/globalProperties';
import { FormStatusService } from '@shared/service/form-status.service';
import { tree } from 'd3';


interface TypeOfStudent {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})


export class Step1Component implements OnInit {



  private _formBuilder = inject(FormBuilder)
  visatypes: any = []
  appRefId: any;
  countries: any = [];
  availableTitles: any = [];
  availableGenders: any = [];
  domestic: boolean = false;
  //! same as current address check boolean
  isSameAddrsFieldsDisable: boolean = false;

  //! student info update declaration
  studentInfo: any = {};

  //! student params declaration
  studentParams: any = [];
  //! status of next or update
  statusUpdate: any;

  step1ParamsData: any[] = [];


  selectedDate: Date

  nameRegx = globalProperties.nameRegx

  stepid: any
  fromPreviewStep: any;
  fromPrevious: any;
  ischecked: boolean = false;
  
  constructor(public _router: Router, private http: HttpClient, private _activatedRoute: ActivatedRoute, private datePipe: DatePipe, private formStatusService: FormStatusService) {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['Id']) {
        this.appRefId = params['Id'],
          this.statusUpdate = params['status']
      }
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
    })




  }

  ngOnInit(): void {
   
    this.transformResponse();
    this.getOrigin();
    this.getStudentTypes()
    this.getCountries();
    this.getVisaTypes();
    this.getAllAvailableTitlesData();
    this.getAllAvailableGendersData();
    
    
    AOS.init({
      duration: 5000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
    
    
    var forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      ?.forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })



    console.log(!this.originFormGroup.valid &&
      !this.personalInformationFormGroup.valid &&
      !this.usiAndAddressFormGroup.valid &&
      !this.currentAddresFormGroup.valid &&
      !this.overseasAddresFormGroup.valid,

    )

  
  }
  ngAfterViewInit() {
    // this.transformResponse()
  }
  
  async transformResponse() {
    const url = '/studentapi/Student/getstudentparams';
    const payload = {
      "stepid": this.stepid,
      "code": this.appRefId
    };
    await this.apiService.post(url, payload).subscribe((response: any) => {
      console.log(response, "hello")
      this.step1ParamsData = response?.data?.previewdata?.studentparams;
      console.log(this.step1ParamsData,"sdfjklsdfa sjldkfsa");
      
      const transformedData = this.transform(response?.data?.previewdata?.studentparams); 
      this.patchFormParamValues(transformedData);
      const stdPersonalInfo = response?.data?.previewdata?.studentpersonalInfo
      this.patchFormPersonalValues(stdPersonalInfo)
    });
  }
  transform(studentParams: any[]) {

    const transformedData: any = {
      usi: {
        uniquestudentidentifier: ''
      },
      currentaddress: {
        current_country: '',
        current_buldingpropertyname: '',
        current_flatno: '',
        current_streetno: '',
        current_streetname: '',
        current_citytown: '',
        current_state: '',
        current_postcode: '',
        current_housephone: '',
        current_workphone: '',
        current_mobileno: '',
      },
      overseasaddress: {
        overseas_country: '',
        overseas_buldingpropertyname: '',
        overseas_flatno: '',
        overseas_streetno: '',
        overseas_streetname: '',
        overseas_citytown: '',
        overseas_state: '',
        overseas_postcode: '',
        overseas_housephone: '',
        overseas_workphone: '',
        overseas_mobileno: '',
      }
    };

    studentParams?.forEach(param => {
      if (param.groupname === 'usi') {
        transformedData.usi[param.paramkey] = param.paramval;
      } else if (param.groupname === 'currentaddress') {
        transformedData.currentaddress[param.paramkey] = param.paramval;
      }
      else if (param.groupname === 'overseasaddress') {
        transformedData.overseasaddress[param.paramkey] = param.paramval;
      }
    });

    return transformedData;
  }
  patchFormPersonalValues(data: any) {
    this.personalInformationFormGroup?.get?.('visanumber')?.patchValue(data?.visanumber)

    this.personalInformationFormGroup?.get('visatype')?.patchValue(data?.visatype);

    // const formattedDob = this.formatDate(data.dob);
    const dateObject = this.convertToDate(data?.dob);
    // const pexpdateObject = this.convertToDate(data.passportexpirydate);
    const pexpdateObject = new Date(data?.passportexpirydate)
    const formattedDate = this.formatDateToMMDDYYYY(pexpdateObject);

    const vExpObject = new Date(data?.visaexpirydate)
    const visaExpDate = this.formatDateToMMDDYYYY(vExpObject)

    this.personalInformationFormGroup?.get('dob').setValue(dateObject);
    this.originFormGroup.patchValue({
      origin: data?.origin,
      studenttype: data?.studenttype
    });
    this.personalInformationFormGroup?.patchValue({
      title: data?.title,
      firstname: data?.firstname,
      middlename: data?.middlename,
      lastname: data?.lastname,
      gender: data?.gender,
      // dob: dateObject,

      emailid: data?.emailid,
      birthplace: data?.birthplace,
      nationality: data?.nationality,
      countrybirth: data?.countrybirth,
      passportexpirydate: new Date(formattedDate),
      passportno: data?.passportno,
      // visanumber: data?.visanumber,
      // visatype: data?.visatype,
      residentialstatus: data?.residentialstatus,
      visaexpirydate: new Date(visaExpDate)
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
  // formatDate(dateString: string): string {
  //   const date = new Date(dateString);
  //   const month = ('0' + (date.getMonth() + 1)).slice(-2);
  //   const day = ('0' + date.getDate()).slice(-2);
  //   const year = date.getFullYear();
  //   return `${month}/${day}/${year}`;
  // }
  patchFormParamValues(data: any): void {
    this.usiAndAddressFormGroup.patchValue({
      uniquestudentidentifier: data?.usi.uniquestudentidentifier
    });
    this.currentAddresFormGroup.patchValue({
      current_country: data?.currentaddress.country,
      current_buldingpropertyname: data?.currentaddress.buldingpropertyname,
      current_flatno: data?.currentaddress.flatno,
      current_streetno: data?.currentaddress.streetno,
      current_streetname: data?.currentaddress.streetname,
      current_citytown: data?.currentaddress.citytown,
      current_state: data?.currentaddress.state,
      current_postcode: data?.currentaddress.postcode,
      current_housephone: data?.currentaddress.housephone,
      current_workphone: data?.currentaddress.workphone,
      current_mobileno: data?.currentaddress.current_mobileno,
    });
    this.overseasAddresFormGroup.patchValue({
      overseas_country: data?.overseasaddress.country,
      overseas_buldingpropertyname: data?.overseasaddress.buldingpropertyname,
      overseas_flatno: data?.overseasaddress.flatno,
      overseas_streetno: data?.overseasaddress.streetno,
      overseas_streetname: data?.overseasaddress.streetname,
      overseas_citytown: data?.overseasaddress.citytown,
      overseas_state: data?.overseasaddress.state,
      overseas_postcode: data?.overseasaddress.postcode,
      overseas_housephone: data?.overseasaddress.housephone,
      overseas_workphone: data?.overseasaddress.workphone,
      overseas_mobileno: data?.overseasaddress.current_mobileno,
    });
    if (this.fromPrevious || this.fromPreviewStep) {
      console.log(this.fromPrevious)
      this.ischecked = true
      this.copyCurrentAddress({ checked: true })
    }
  }
  // Date Validator
  dateValidator(control: FormControl) {
    if (control.value && control.value.length === 10) {
      const DATE_REGEX = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
      if (!DATE_REGEX.test(control.value)) {
        return { invalidDate: true };
      }
    }
    return null;
  }

  onDateChange() {
    const control = this.personalInformationFormGroup?.get('dob');
    if (control) {
      control.updateValueAndValidity();
    }
  }
  // Date Validator Ends


  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/[a-zA-Z ]/.test(inputChar)) {
      event.preventDefault();
    }
  }





  originData: any = [];
  studentTypes: any = []
  //1
  originFormGroup = this._formBuilder.group({
    origin: ['', Validators.required],
    studenttype: ['', Validators.required],
  });

  personalInformationFormGroup = this._formBuilder.group({
    title: [''],
    firstname: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(globalProperties.nameRegx)
    ],],
    middlename: ['',],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(globalProperties.nameRegx)]],
    preferedname: [''],
    gender: [''],
    dob: [null],
    emailid: ['', [Validators.required, Validators.pattern(globalProperties.emailRegx)]],
    birthplace: ['', Validators.pattern(globalProperties.nameRegx)],
    nationality: ['India'],
    countrybirth: ['India'],
    passportexpirydate: [new Date(), Validators.required],
    passportno: ['', [Validators.required, Validators.pattern(globalProperties.passportVisaRegx)]],
    visanumber: [''],
    visatype: [''],
    residentialstatus: [''],
    visaexpirydate: [new Date(), Validators.required],
  });

  //3
  usiAndAddressFormGroup = this._formBuilder.group({
    uniquestudentidentifier: [''],
  });

  currentAddresFormGroup = this._formBuilder.group({

    current_country: ['India', Validators.required],
    current_buldingpropertyname: [''],
    current_flatno: [''],
    current_streetno: ['', Validators.required],
    current_streetname: ['', Validators.required],
    current_citytown: ['', Validators.required],
    current_state: [''],
    current_postcode: ['', Validators.required],
    current_housephone: ['', Validators.pattern(globalProperties.phoneRegex)],
    current_workphone: ['', Validators.pattern(globalProperties.phoneRegex)],
    current_mobileno: ['', Validators.pattern(globalProperties.phoneRegex)],
  })

  overseasAddresFormGroup = this._formBuilder.group({
    overseas_country: ['', Validators.required],
    overseas_buldingpropertyname: [''],
    overseas_flatno: [''],
    overseas_streetno: ['', Validators.required],
    overseas_streetname: ['', Validators.required],
    overseas_citytown: ['', Validators.required],
    overseas_state: [''],
    overseas_housephone: ['', Validators.pattern(globalProperties.phoneRegex)],
    overseas_postcode: ['', Validators.required],
    overseas_workphone: ['', Validators.pattern(globalProperties.phoneRegex)],
    overseas_mobileno: ['', Validators.pattern(globalProperties.phoneRegex)],


  })


  studenttype: any
  apiService = inject(APICallService)
  appStatus: any

  async getAllAvailableTitlesData() {
    const url = '/studentapi/Student/availableTitles';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.availableTitles = res.data.list;


    });
  }
  async getAllAvailableGendersData() {
    const url = '/studentapi/Student/availableGenders';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.availableGenders = res.data.list;


    });
  }
  async getOrigin() {
    const url = '/studentapi/Student/originslist';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.originData = res.data?.list;
    });
  }
  async getStudentTypes() {
    const url = '/studentapi/Student/studenttypes';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.studentTypes = res.data.list;
    });
  }
  async getVisaTypes() {
    const url = '/studentapi/Student/availablevisalist';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.visatypes = res.data.list;
    });
  }
  async getCountries() {
    const url = '/studentapi/Student/availablecountries';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.countries = res.data.list;
    });
  }
  copyCurrentAddress(event: any): void {
    console.log(event)
    if (event.checked) {
      this.isSameAddrsFieldsDisable = true;
      this.overseasAddresFormGroup.patchValue({
        overseas_country:
          this.currentAddresFormGroup.get('current_country')?.value,
        overseas_flatno:
          this.currentAddresFormGroup.get('current_flatno')?.value,
        overseas_streetno:
          this.currentAddresFormGroup.get('current_streetno')?.value,
        overseas_streetname:
          this.currentAddresFormGroup.get('current_streetname')?.value,
        overseas_state: this.currentAddresFormGroup.get('current_state')?.value,
        overseas_housephone:
          this.currentAddresFormGroup.get('current_housephone')?.value,
        overseas_mobileno:
          this.currentAddresFormGroup.get('current_mobileno')?.value,
        overseas_buldingpropertyname: this.currentAddresFormGroup.get(
          'current_buldingpropertyname'
        )?.value,
        overseas_citytown:
          this.currentAddresFormGroup.get('current_citytown')?.value,
        overseas_postcode:
          this.currentAddresFormGroup.get('current_postcode')?.value,
        overseas_workphone:
          this.currentAddresFormGroup.get('current_workphone')?.value,
      });
    } else {
      this.isSameAddrsFieldsDisable = false;
      this.overseasAddresFormGroup.patchValue({

        overseas_country: '',
        overseas_flatno: '',
        overseas_streetname: '',
        overseas_state: '',
        overseas_housephone: '',
        overseas_mobileno: '',
        overseas_buldingpropertyname: '',
        overseas_streetno: '',
        overseas_citytown: '',
        overseas_postcode: '',
        overseas_workphone: '',
      });
    }
  }
  async gotoStep2() {
    console.log("Complete Step 1 Data:",
      this.originFormGroup.value,
      this.personalInformationFormGroup.value,
      this.usiAndAddressFormGroup.value,
      this.currentAddresFormGroup.value,
      this.overseasAddresFormGroup.value,



    )
    if (this.step1ParamsData == undefined) {
      console.log("next method called");
      
      this.appStatus = 1;
      const personalData = {
        code: this.appRefId,
        appstatus: this.appStatus,
        ...this.originFormGroup.value,
        ...this.personalInformationFormGroup.value,
      };

      const step1URL = '/studentapi/Student/StudentAddorUpdate';
      const personalPayload = personalData;
      try {
        await this.apiService.post(step1URL, personalPayload).toPromise();
      } catch (err) {
        console.log(err);
      }
      const formData = {
        ...this.usiAndAddressFormGroup.value,
        ...this.currentAddresFormGroup.value,
        ...this.overseasAddresFormGroup.value,

      }

      const usiPayload = this.transformToPayload(formData);
      const apiUrl = '/studentapi/Student/studentparams'; // Replace with your backend API URL
      await this.apiService.post(apiUrl, usiPayload).subscribe(
        (response) => {
          console.log('Payload sent successfully', response);
          this.updateappStatus();
        },
        (error) => {
          console.error('Error sending payload', error);
        }
      );
      // this.sendPayloadToBackend(usiPayload);
    } else if(this.step1ParamsData != undefined) {
      console.log("update method called");
      
      this.appStatus = 1;

      const personalData = {
        code: this.appRefId,
        appstatus: this.appStatus,
        ...this.originFormGroup.value,
        ...this.personalInformationFormGroup.value,

      };

      const step1URL = '/studentapi/Student/UpdateStuPersonalInfo';
      const personalPayload = personalData;
      try {
        await this.apiService.post(step1URL, personalPayload)
          .subscribe(
            (response) => {
              console.log('Update of Step 1 Sent successfully', response);
            },
            (error) => {
              console.error('Error sending payload', error);
            }
          );
      } catch (err) {
        console.log(err);
      }
      const formData = {
        ...this.usiAndAddressFormGroup.value,
        ...this.currentAddresFormGroup.value,
        ...this.overseasAddresFormGroup.value,

      }

      const usiPayload = this.transformToPayload(formData);
      const apiUrl = '/studentapi/Student/studentparamsupdate'; // Replace with your backend API URL
      await this.apiService.post(apiUrl, usiPayload).subscribe(
        (response) => {
          console.log('Payload sent successfully', response);
          this.updateappStatus();
        },
        (error) => {
          console.error('Error sending payload', error);
        }
      );
      // this.sendUpdatedPayloadToBackend(usiPayload);
    }

    

  }
  OnClickOfCancel() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: 4, stepid: 5 } })
  }
  async gotoStep2withUpdate() {
    this.appStatus = 1;

    const personalData = {
      code: this.appRefId,
      appstatus: this.appStatus,
      ...this.originFormGroup.value,
      ...this.personalInformationFormGroup.value,

    };

    const step1URL = '/studentapi/Student/UpdateStuPersonalInfo';
    const personalPayload = personalData;
    try {
      await this.apiService.post(step1URL, personalPayload).toPromise();
    } catch (err) {
      console.log(err);
    }
    const formData = {
      ...this.usiAndAddressFormGroup.value,
      ...this.currentAddresFormGroup.value,
      ...this.overseasAddresFormGroup.value,

    }

    const usiPayload = this.transformToPayload(formData);
    this.sendUpdatedPayloadToBackend(usiPayload);

    this._router.navigate(['/public/step2'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
  }
  async gotoPreviewwithUpdate() {
    this.appStatus = 1;

    const personalData = {
      code: this.appRefId,
      appstatus: this.appStatus,
      ...this.originFormGroup.value,
      ...this.personalInformationFormGroup.value,

    };

    const step1URL = '/studentapi/Student/UpdateStuPersonalInfo';
    const personalPayload = personalData;
    try {
      await this.apiService.post(step1URL, personalPayload)
        .subscribe(
          (response) => {
            console.log('Update of Step 1 Sent successfully', response);
          },
          (error) => {
            console.error('Error sending payload', error);
          }
        );
    } catch (err) {
      console.log(err);
    }
    const formData = {
      ...this.usiAndAddressFormGroup.value,
      ...this.currentAddresFormGroup.value,
      ...this.overseasAddresFormGroup.value,

    }

    const usiPayload = this.transformToPayload(formData);
    const apiUrl = '/studentapi/Student/studentparamsupdate'; // Replace with your backend API URL
    await this.apiService.post(apiUrl, usiPayload).subscribe(
      (response) => {
        console.log('Payload sent successfully', response);
        this.updateappStatus();
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
    // this.sendUpdatedPayloadToBackend(usiPayload);

    
  }
  transformToPayload(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Map each form control to the required payload format
    const mapping = {
      uniquestudentidentifier: 'uniquestudentidentifier',
      current_country: 'country',
      current_buldingpropertyname: 'buldingpropertyname',
      current_flatno: 'flatno',
      current_streetno: 'streetno',
      current_streetname: 'streetname',
      current_citytown: 'citytown',
      current_state: 'state',
      current_postcode: 'postcode',
      current_housephone: 'housephone',
      current_workphone: 'workphone',
      current_mobile_phone: 'mobileno',
    };

    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        const paramkey = mapping[key] || key;
        payload.push({
          code: this.appRefId,
          groupname: key.startsWith('current')
            ? 'currentaddress'
            : key.includes('uni')
              ? 'usi'
              : 'overseasaddress',
          paramkey: paramkey,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 1
        });
      }
    }
    return payload;
  }
  async sendPayloadToBackend(payload: any[]) {

    const apiUrl = '/studentapi/Student/studentparams'; // Replace with your backend API URL
    await this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Payload sent successfully', response);
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
    this.updateappStatus();
  }
  async sendUpdatedPayloadToBackend(payload: any[]) {
    const apiUrl = '/studentapi/Student/studentparamsupdate'; // Replace with your backend API URL
    await this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        console.log('Payload sent successfully', response);
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
    this.updateappStatus();
  }
  updateappStatus() {
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate ';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
      status: 0
    };

    this.apiService.post(apiUrl2, pLoad).subscribe((res) => {
      if ((this.step1ParamsData != undefined || this.step1ParamsData == undefined) && this.fromPreviewStep == undefined) {
        this._router.navigate(['/public/step2'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus,stepid: 2 } })
      } else if (this.fromPreviewStep) {
        this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
      }
    });
  }

  //? Data send to Current address to same address
  sendDataCrntAddrsToSameAddrs(event: any, fieldName: string): void {
    if (this.isSameAddrsFieldsDisable) {
      if (fieldName.toLocaleUpperCase() == 'COUNTRY') {

        this.overseasAddresFormGroup.get('overseas_country').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'BUILDINGNAME') {
        this.overseasAddresFormGroup.get('overseas_buldingpropertyname').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'FLATDETAILS') {
        this.overseasAddresFormGroup.get('overseas_flatno').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'STREETNO') {
        this.overseasAddresFormGroup.get('overseas_streetno').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'STREETNAME') {
        this.overseasAddresFormGroup.get('overseas_streetname').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'CITYORTOWN') {
        this.overseasAddresFormGroup.get('overseas_citytown').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'STATE') {
        this.overseasAddresFormGroup.get('overseas_state').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'POSTCODE') {
        this.overseasAddresFormGroup.get('overseas_postcode').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'HOMEPHONE') {
        this.overseasAddresFormGroup.get('overseas_housephone').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'WORKPHONE') {
        this.overseasAddresFormGroup.get('overseas_workphone').patchValue(event.target.value);
      } else if (fieldName.toLocaleUpperCase() == 'MOBILEPHONE') {
        this.overseasAddresFormGroup.get('overseas_mobileno').patchValue(event.target.value);
      }
    }
    return;
  }
  //! Accept only letters and space 
  letterWithSpaceOnly(event): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 32) {
      return true;
    } else if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
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
  //! pincode length Checking
  checkPincodeLength(elem): boolean {
    if (elem.target.value.length < 5) {
      return true;
    }
    return false;
  }
}
