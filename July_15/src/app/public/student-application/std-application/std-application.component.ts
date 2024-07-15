import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-std-application',
  templateUrl: './std-application.component.html',
  styleUrls: ['./std-application.component.scss']
})
export class StdApplicationComponent  extends UnsubscribeOnDestroyAdapter implements OnInit{
  
  http = inject(HttpClient)
  apiService = inject(APICallService)
  router = inject(Router)
  reqkey: any;
  reqtoken: any;
  Authorization: any;
  reqval: any;
  unixNumber : any
  currentUrl!: string;
  id: any;
  newId: any;
  appRefId: any;
  appStatus: any;


  submitted = false;
  loading = false;
  error = '';
  hide = true;
  authService = inject(AuthService) 
ngOnInit(): void {
  this.initialize()
}

async initialize(){
  this.authService.login('rsk@student', 'rskStudent@123').subscribe((res: any) => {
    console.log("Login Via Code Success and Respose: ", res)
    this.createAppRefId()
  })
}
createAppRefId() {
  console.log("REFId Method Called")
    const idUrl = '/studentapi/Student/StudentsautoIdNo';
    const pload = {};
    try {
      this.apiService.post(idUrl, pload).subscribe({
        next: (res: any) => {
        this.id = parseInt(res.data.list[0].id) + 1;
       
          if (!this.id) {
            this.newId = 240000100001;
            console.log('New Id: ', this.newId);
          
            this.appRefId = 'E' + this.newId;
          } else {
            console.log('ID form Backend: ', this.id);
            this.newId = 240000100000 + this.id;
            console.log('New Id: ', this.newId);
            this.appRefId = 'E' + this.newId;
            console.log('appRefId: ', this.appRefId);
          }
          this.appStatus = 1;

        },
        error: (err: any) => {
          console.log("Error:", err)
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
show: boolean = false
onClick(){
  this.show = true;
  this.showSaved = false;
}
selectedOption: number = 1;
ApplicationRefID: string = '';
showSaved : boolean = false

savedAppllication(){
  this.showSaved = true;
  this.show = false;
}
onOptionChange(value: number) {
  this.selectedOption = value;
}
async onStartClick() {
  const url = '/studentapi/Student/Studentsappstatus';
  const payload = {
    byval: this.ApplicationRefID
  };
  try {
    const res: any = await this.apiService.post(url, payload).toPromise();
    const list = res.data['list'][0];
    console.log("Existing App Status: ", list.appstatus)
    if(list.appstatus == 1){
      this.router.navigate(['/public/step2'], {queryParams: {appRefId: list.code, appstatus: list.appstatus,stepid:2}}) 
    }
    if(list.appstatus == 2){
      this.router.navigate(['/public/step3'], {queryParams: {appRefId: list.code, appstatus: list.appstatus,stepid:3}}) 
    }
    if(list.appstatus == 3){
      this.router.navigate(['/public/step4'], {queryParams: {appRefId: list.code, appstatus: list.appstatus,stepid:4}}) 
    }
    if(list.appstatus == 4){
      this.router.navigate(['/public/step5'], {queryParams: {appRefId: list.code, appstatus: list.appstatus}}) 
    }
    if(list.appstatus == 5){
      this.router.navigate(['/public/step6'], {queryParams: {appRefId: list.code, appstatus: list.appstatus}}) 
    }
    if(list.appstatus == 6){
      this.router.navigate(['/public/step7'], {queryParams: {appRefId: list.code, appstatus: list.appstatus}}) 
    }
   
  }catch (err) {
    console.log(err);
  }
   
  
 
}
gotoStep1(){
  this.router.navigate(['/public/step1'], {queryParams: {Id: this.appRefId}})
}


}
