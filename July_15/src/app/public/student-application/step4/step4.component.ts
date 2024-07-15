import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APICallService } from '@core';
import AOS from "aos";


@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  appRefId: any
  appStatus: any
  servicesList: any = [];
  serviceCategoryList: any = [];
  facilitiesList: any = [];
  providersList: any = [];
  OSHCProvidersList: any = [];
  OSHCTypesList: any = [];
  formattedData: any;
  groupedData: any;
  serviceTableList: any = [];
  admissionStaffData: any = [];
  accountManagersData: any = [];

  stepid: any
  fromPreviewStep: any
  fromPrevious: any
  selectedRadionOptionValue: any
 
  step4FormData: any = []
  flagED: string = 'N';
  flagSO: string = 'N';


  apiService = inject(APICallService);
  private _formBuilder = inject(FormBuilder)
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this.appRefId = params['appRefId']

      if (params['fromPreviewStep']) {
        this.fromPreviewStep = params['fromPreviewStep']
      }
      if (params['fromPrevious']) {
        this.fromPrevious = params['fromPrevious']
      }
      if (params['stepid']) {
        this.appRefId = params['appRefId']
        this.stepid = params['stepid']
      }

      const appStatusString = params['appstatus']
      // if (appStatusString !== null) {
      // Guaranteed non-null string, safe to convert
      //   this.appStatus = parseFloat(appStatusString);
      //   this.appStatus = this.appStatus + 1
      // }
    })
  }
  ngOnInit(): void {
    console.log(this.fromPreviewStep, this.fromPrevious, "this.pre")
    this.getAvailableGroupnameFromParamsSO();
    this.getAvailableGroupnameFromParamsDE();
    this.getAllServicesList();
    this.getAllServiceCategories();
    this.getAllFacilities();
    this.getAllProviders();
    this.getAllOSHCProvidersList();
    this.getAllOSHCTypesList();
    this.getAllAdmissionStaff();
    this.getAllAccountManagersData();

    this.getFormattedData();
    this.transformResponse()

    this.selectedRadionOptionValue = "yes"

    console.log("tajklajskfjalsf afajkswlfasd ",this.step4FormData);

    AOS.init({
      duration: 4000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
    
    
    


  }
  
  addservicerequest = this._formBuilder.group({
    service: [''],
    categeory: [''],
    facility: [''],
    provider: [''],
    price: ['', Validators.required],
    servicestartdate: [new Date(), Validators.required],
    comment: ['', Validators.required],
    studenthealthcover: ['Yes'],
    OSHCprovider: [''],
    OSHCtype: [''],
    coverduration: ['0'],
    fee: ['', Validators.required],
    startdate: [new Date(), Validators.required],
  });
  disability = this._formBuilder.group({
    disability: ['No'],
    liketorecive: ['Yes'],
    contactname: [''],
    contacttype: [''],
    relationship: [''],
    address: [''],
    phone: ['', Validators.pattern('^[0-9]{10}$')],
    email: ['', [Validators.pattern(this.emailPattern)]],


  });

  accountmanager = this._formBuilder.group({
    accountmanager: [''],
  });
  admissionstaff = this._formBuilder.group({
    admstaff: [''],
  });


  async getAllServicesList() {
    const url = '/studentapi/Student/listofservices';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.servicesList = res?.data.list;

    });
  }

  async getAllServiceCategories() {
    const url = '/studentapi/Student/listofservicescategory';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.serviceCategoryList = res?.data.list;

    });
  }

  async getAllFacilities() {
    const url = '/studentapi/Student/listoffacility';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.facilitiesList = res?.data.list;

    });
  }
  async getAllProviders() {
    const url = '/studentapi/Student/listoffacilitycategory';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.providersList = res?.data.list;

    });
  }
  async getAllOSHCProvidersList() {
    const url = '/studentapi/Student/listofOSHCproviders';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.OSHCProvidersList = res?.data.list;

    });
  }
  async getAllOSHCTypesList() {
    const url = '/studentapi/Student/listofOSHCtypes';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.OSHCTypesList = res?.data.list;

    });
  }
  addService() {
    const formData = this.addservicerequest.value;
    console.log(formData)
    
    
    const payload = this.transformToPayloadServices(formData);
    this.sendPayloadToBackend(payload);
  }
  updateService() {
    this.addservicerequest.get('servicestartdate').patchValue(new Date(this.addservicerequest.get('servicestartdate').value.toLocaleDateString()))
    this.addservicerequest.get('startdate').patchValue(new Date(this.addservicerequest.get('startdate').value.toLocaleDateString()))
    const formData = this.addservicerequest.value;
    console.log(formData);
    const payload = this.transformToPayloadServices(formData);
    const apiUrl = '/studentapi/Student/studentparamsupdate'; // Replace with your backend API URL
    this.apiService.post(apiUrl, payload).subscribe(
      (response) => {
        this.getFormattedData();
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );
  }
  transformToPayloadServices(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Services&OSHC',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 4
        });
      }
    }

    return payload;
  }
  sendPayloadToBackend(payload: any[]): void {


    const apiUrl = '/studentapi/Student/studentparams'; // Replace with your backend API URL
    this.apiService.post(apiUrl, payload).subscribe(
      (response) => {

        this.getFormattedData();
        console.log("step4 form data ",this.step4FormData);
        
      },
      (error) => {
        console.error('Error sending payload', error);
      }
    );

  }
  async updateappStatus() {
    this.appStatus = 4;
    const currentDate = new Date().toISOString().split('T')[0];
    const apiUrl2 = '/studentapi/Student/StudentAddorUpdate ';
    const pLoad = {
      code: this.appRefId,
      appstatus: this.appStatus,
      updatetime: currentDate,
      status: 0
    };


    await this.apiService.post(apiUrl2, pLoad).subscribe((res) => {
      this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus} })
    });

  }
  gotoStep3() {
    this._router.navigate(['/public/step3'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus - 1, stepid: 3,fromPrevious: true } })
  }
 async gotoStep5() {

    console.log(
      this.disability.value,
      this.accountmanager.value,
      this.admissionstaff.value
    )

    if (this.flagED == 'N') {
      const formData = {
        ...this.disability.value,
        ...this.accountmanager.value,
        ...this.admissionstaff.value,
      };


      const payload = this.transformToPayloadDisability(formData);
      const apiUrl = '/studentapi/Student/studentparams'; // Replace with your backend API URL
     await this.apiService.post(apiUrl, payload).subscribe(
        (response) => {

          this.getFormattedData();
          this.updateappStatus()
        },
        (error) => {
          console.error('Error sending payload', error);
        }
      );
      // this.sendPayloadToBackend(payload);
      // this.updateappStatus();
    } else if(this.flagED == 'Y'){
      this.appStatus = 4;
      console.log(
          this.disability.value,
          this.accountmanager.value,
          this.admissionstaff.value
        )

      const formData = {
        ...this.disability.value,
        ...this.accountmanager.value,
        ...this.admissionstaff.value,
      };
    const step4URL = '/studentapi/Student/studentparamsupdate';
    const payload = this.transformToPayloadDisability(formData);
    console.log("counnakfasdf",payload);
    
    try {
        await this.apiService.post(step4URL, payload)
          .subscribe(
            (response) => {
              console.log('Update of Step 4 Sent successfully', response);
              this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
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
  transformToPayloadDisability(formData: any): any[] {
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        payload.push({
          code: this.appRefId,
          groupname: 'Disability&Emergency',
          paramkey: key,
          paramval: formData[key],
          createtime: currentDate,
          updatetime: currentDate,
          stepid: 4
        });
      }
    }

    return payload;
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

  async getFormattedData() {

    const url = '/studentapi/Student/studentpreviewdata';
    const payload = { code: this.appRefId };
    await this.apiService.post(url, payload).subscribe((res: any) => {

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
        ...groupedParams,
      };
      console.log(this.groupedData) //
      let groupKeys = Object.keys(this.groupedData);

      for (let i = 0; i < groupKeys.length; i++) {
        if (groupKeys[i] == 'Services&OSHC') {
          this.serviceTableList.push(this.groupedData[groupKeys[i]]);
        }
      }


      // this.groupedData = { ...studentInfo,  ...courseList, ...groupedParams}

    });
  }
  //? columns of table
  displayedColumns: string[] = ['service', 'categeory', 'facility', 'provider', 'servicestartdate', 'startdate', 'price', 'comment', 'action']
  // dataSource = this.serviceTableList

  async getAllAdmissionStaff() {
    const url = '/studentapi/Student/admissionstaff';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.admissionStaffData = res.data.list;
      console.log("admission lIst", res);

    });

  }
  async getAllAccountManagersData() {
    const url = '/studentapi/Student/accountmanagers';
    const payload = {};
    await this.apiService.post(url, payload).subscribe((res: any) => {
      this.accountManagersData = res.data.list;
      console.log("accountManagers ", res);

    });
  }

  OnClickOfCancel() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: 4, stepid: 5 } })
  }
  
  async transformResponse() {
    const url = '/studentapi/Student/getstudentparams';
    const payload = {
      "stepid": this.stepid,
      "code": this.appRefId
    };
    await this.apiService.post(url, payload).subscribe((response: any) => {
      console.log(response, "Hello ")
      this.step4FormData = response?.data?.previewdata?.studentparams;
      const transformedData = this.transform(response?.data?.previewdata?.studentparams);
      this.patchFormParamValues(transformedData);

    });
  }

  transform(studentParams: any[]) {

    const transformedData: any = {

      addservicerequest: {
        service: '',
        categeory: '',
        facility: '',
        provider: '',
        price: '',
        servicestartdate: '',
        comment: '',
        studenthealthcover: '',
        OSHCprovider: '',
        OSHCtype: '',
        coverduration: '',
        fee: '',
        startdate: ''
      },
      disabilityAccAdm: {
        disability: '',
        liketorecive: '',
        contactname: '',
        contacttype: '',
        relationship: '',
        address: '',
        phone: '',
        email: '',
        accountmanager: '',
        admstaff: '',
      }
      

    };

    studentParams?.forEach(param => {
      if (param.groupname === 'Services&OSHC') {
        transformedData.addservicerequest[param.paramkey] = param.paramval;
      } else if (param.groupname === 'Disability&Emergency') {
        transformedData.disabilityAccAdm[param.paramkey] = param.paramval;
      }

    });

    return transformedData;
  }

  patchFormParamValues(data: any): void {

    console.log(data, "hello 1")
    this.addservicerequest.patchValue({
      service: data?.addservicerequest?.service,
      categeory: data?.addservicerequest?.categeory,
      facility: data?.addservicerequest?.facility,
      provider: data?.addservicerequest?.provider,
      price: data?.addservicerequest?.price,
      servicestartdate: new Date(data?.addservicerequest?.servicestartdate),
      comment: data?.addservicerequest?.comment,
      studenthealthcover: data?.addservicerequest?.studenthealthcover,
      OSHCprovider: data?.addservicerequest?.OSHCprovider,
      OSHCtype: data?.addservicerequest?.OSHCtype,
      coverduration: data?.addservicerequest?.coverduration,
      fee: data?.addservicerequest?.fee,
      startdate:  new Date(data?.addservicerequest?.startdate),

    });
    this.disability.patchValue({
      disability: data?.disabilityAccAdm?.disability,
      liketorecive: data?.disabilityAccAdm?.liketorecive,
      contactname: data?.disabilityAccAdm?.contactname,
      contacttype: data?.disabilityAccAdm?.contacttype,
      relationship: data?.disabilityAccAdm?.relationship,
      address: data?.disabilityAccAdm?.address,
      phone: data?.disabilityAccAdm?.phone,
      email: data?.disabilityAccAdm?.email,
    });
    this.accountmanager.patchValue({
      accountmanager: data?.disabilityAccAdm?.accountmanager,
    });
    this.admissionstaff.patchValue({
      admstaff: data?.disabilityAccAdm?.admstaff,
    });
  }

  async gotoPreviewwithUpdate() {
    this.appStatus = 4;
     console.log(
      this.disability.value,
      this.accountmanager.value,
      this.admissionstaff.value
    )

    const formData = {
      ...this.disability.value,
      ...this.accountmanager.value,
      ...this.admissionstaff.value,
    };

    const step4URL = '/studentapi/Student/studentparamsupdate';

    const payload = this.transformToPayloadDisability(formData);
    console.log("counnakfasdf",payload);
    
    try {
        await this.apiService.post(step4URL, payload)
          .subscribe(
            (response) => {
              console.log('Update of Step 4 Sent successfully', response);
              this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })
            },
            (error) => {
              console.error('Error sending payload', error);
            }
          );
      } catch (err) {
        console.log(err);
      }
   
    
  }

  // updateaddService() {
  //   const formData = this.addservicerequest.value;
  //   console.log(formData)
  //   const payload = this.transformToPayloadServices(formData);
  //   this.sendPayloadToBackend(payload);
  // }


  transformToPayload(formData: any): any[] {
    console.log(formData)
    const payload: any = [];
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Map each form control to the required payload format
    // const mapping = {
    //   uniquestudentidentifier: 'uniquestudentidentifier',
    //   current_country: 'country',
    //   current_buldingpropertyname: 'buldingpropertyname',
    //   current_flatno: 'flatno',
    //   current_streetno: 'streetno',
    //   current_streetname: 'streetname',
    //   current_citytown: 'citytown',
    //   current_state: 'state',
    //   current_postcode: 'postcode',
    //   current_housephone: 'housephone',
    //   current_workphone: 'workphone',
    //   current_mobile_phone: 'mobileno',
    // };

    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key]) {
        console.log(key)
        // const paramkey = mapping[key] || key;
        // payload.push({
        //   code: this.appRefId,
        //   groupname: key.startsWith('current')
        //     ? 'currentaddress'
        //     : key.includes('uni')
        //       ? 'usi'
        //       : 'overseasaddress',
        //   paramkey: paramkey,
        //   paramval: formData[key],
        //   createtime: currentDate,
        //   updatetime: currentDate,
        //   stepid: 1
        // });
      }
    }
    return payload;
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
  async getAvailableGroupnameFromParamsDE() {
    const url = '/studentapi/Student/availablegroupname';
    const payload = {
      code: this.appRefId,
      groupname: 'Disability&Emergency',
      stepid:4
    };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      console.log("groupname available ",res);
      
      this.flagED = res.data.recordsavailable;
    });
  }
  async getAvailableGroupnameFromParamsSO() {
    const url = '/studentapi/Student/availablegroupname';
    const payload = {
      code: this.appRefId,
      groupname: 'Services&OSHC',
      stepid:4
    };
    await this.apiService.post(url, payload).subscribe((res: any) => {
      console.log("groupname available ",res);
      
      this.flagSO = res.data.recordsavailable;
    });
  }
}
