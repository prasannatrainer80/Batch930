import { Component, Inject } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-vet-intake-edit',
  templateUrl: './vet-intake-edit.component.html',
  styleUrls: ['./vet-intake-edit.component.scss']
})
export class VetIntakeEditComponent {
  csubform!: UntypedFormGroup;
  editInfo: any = {};
  intakeInfo: any = {};
  action: string;
  dialogTitle: string;
  course: any = {};
  coursesList: any[] = [];
  originsList: any[] = [];

  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<VetIntakeEditComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.editInfo = data.data;
    this.originsList = [];

    let closedate = formatDate(this.editInfo.closedate, 'yyyy-MM-dd', 'en-GB');
    let coursefinishdate = formatDate(this.editInfo.coursefinishdate, 'yyyy-MM-dd', 'en-GB');
 
    this.intakeInfo = {
      coursecode: this.editInfo.coursecode,
      coursename: this.editInfo.coursename,
      name: this.editInfo.name,
      duration: this.editInfo.duration,
      startdate:  this.editInfo.startdate,
      ispublish: this.editInfo.ispublish == "1" ? true : false,
      template: "",
      origincode:  this.editInfo.origincode,
      closedate:closedate,
      coursefinishdate:coursefinishdate
    }
    this.dialogTitle = `Update VET Intake - Course :${this.editInfo.coursename} (${this.editInfo.coursecode}) `;
  }
  ngOnInit() {
    this.loadOrigins();
  }
  onSubmit() {
    let closedate = formatDate(this.intakeInfo.closedate, 'yyyy-MM-dd', 'en-GB');
    let payLoad = {
      code:this.editInfo.code,
      ctypecode: this.editInfo.ctypecode,
      coursecode: this.editInfo.coursecode,
      name: this.intakeInfo.name,
      origincode: this.intakeInfo.origincode,
      closedate:this.intakeInfo.closedate,
      coursefinishdate:this.intakeInfo.coursefinishdate
    };

    if (this._api.isEmpty(this.intakeInfo.name)) {
      this._api.errorNotify('Please enter intake name');
      return;
    }

    if (this._api.isEmpty(this.intakeInfo.closedate)) {
      this._api.errorNotify('Please select intake close date');
      return;
    }
    else {
      let val = formatDate(this.intakeInfo.closedate, 'yyyy-MM-dd HH:mm:ss', 'en-GB');
      payLoad.closedate = val;
    }
    if (this._api.isEmpty(this.intakeInfo.coursefinishdate)) {
      this._api.errorNotify('Please select intake course fnish date');
      return;
    }
    else {
      let val = formatDate(this.intakeInfo.coursefinishdate, 'yyyy-MM-dd HH:mm:ss', 'en-GB');
      payLoad.coursefinishdate = val;
    }
    if (this._api.isEmpty(this.intakeInfo?.origincode)) {
      this._api.errorNotify('Please select intake receiver');
      return;
    }

    let that = this;
    this._api.post('/courseapi/Intake/update', payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that._api.successNotify(resp.message)
          that.dialogRef.close(true);
        }
        else {
          that._api.errorNotify(resp?.message);
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify(msg)
      },
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  loadCoursesByCTypes(ctype: string) {
    let that = this;
    this._api.post('/courseapi/manage/listbycoursetype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          let data = resp.data.list;
          data.unshift({ coursetypecode: '', code: '-1', name: 'ALL' });
          that.coursesList = data;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  loadOrigins() {
    let that = this;
    this._api.post('/appapi/masters/GetReceiversList', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.originsList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
}
