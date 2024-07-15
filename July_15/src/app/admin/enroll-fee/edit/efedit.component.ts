
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { APICallService } from '@core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import * as moment from 'moment';
@Component({
  selector: 'app-efedit',
  templateUrl: './efedit.component.html',
  styleUrls: ['./efedit.component.scss']
})
export class EFEditComponent implements OnInit {
  efform!: UntypedFormGroup;
  efInfo: any = {}
  action: string;
  dialogTitle: string;

  coursetypesList: any[] = [];
  coursesList: any[] = [];
  originsList: any[] = [];

  coursecodes: any[] = []
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  public startDate: string = "";
  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<EFEditComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.coursetypesList = [];
    this.coursesList = [];
    this.originsList = [];

    this.action = data.action;
    this.efInfo = {
      ctype: "",
      fee: "0",
      validto: "",
      origincode: "",
      coursecodes: ""
    }
    this.dialogTitle = "Edit Enrolment Fee"
  }
  ngOnInit() {
    this.startDate = moment().format("yyyy-MM-DD");
    //this.loadCourseTypes();
    //this.loadOrigins();
    setTimeout(() => {
      this.GetFeeEnrollmentById(this.data.data)
    }, 100);
  }
  GetFeeEnrollmentById(data: any) {
    let that = this;
    this._api.post('/courseapi/feeenrollment/getfeeenrollmentbyid', { code: data.code }).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          let _data = resp.data.list[0];
          let vdate = that.datePipe.transform(_data.validto, "yyyy-MM-dd");
          that.efInfo = {
            code: _data.code,
            ctype: _data.coursetypecode,
            fee: _data.fee,
            validto: vdate,
            origincode: _data.origincode,
            coursecodes: "",
            status: _data.status
          }
          //that.loadCoursesByCTypes(_data.coursetypecode, _data.coursecode);
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  //loadCourseTypes() {
  //  let that = this;
  //  this._api.post('/appapi/coursetype/list', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0' && resp.data.list.length > 0) {
  //        that.coursetypesList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}
  //loadOrigins() {
  //  let that = this;
  //  this._api.post('/appapi/masters/getorigins', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.originsList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}
  //onChangeCourseType(ctype: any) {
  //  this.loadCoursesByCTypes(ctype, '');
  //}
  //loadCoursesByCTypes(ctype: string, coursecode: string) {
  //  let that = this;
  //  this._api.post('/courseapp/manage/listbycoursetype', { ctypecode: ctype }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.coursesList = resp.data.list;
  //        if (!that._api.isEmpty(coursecode)) {
  //          that.coursecodes = [coursecode + ''];
  //        }
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}
  UpdateEnrollFee() {
    let validto = this.datePipe.transform(this.efInfo.validto, "yyyy-MM-dd");
    if (this._api.isEmpty(this.efInfo.validto)) {
      this._api.errorNotify('Please select valid to date');
      return;
    }
    let payLoad = {
      code: this.data?.data?.code,
      //ctype: this.efInfo.ctype,
      // fee: this.efInfo.fee,
      validto: validto,
      // origincode: this.efInfo.origincode,
      // coursecodes: this.coursecodes.join(','), 
      // status: this.efInfo.status,
    };
    //if (!this._api.checkPrice(this.efInfo.fee, true)) {
    //  this._api.errorNotify('Please enter valid enrolment fee');
    //  return;
    //}
    if (this._api.isEmpty(this.efInfo.validto)) {
      this._api.errorNotify('Please select valid date');
      return;
    }
    //if (this._api.isEmpty(this.efInfo.origincode)) {
    //  this._api.errorNotify('Please select origin');
    //  return;
    //}
    //if (this._api.isEmpty(payLoad.coursecodes)) {
    //  this._api.errorNotify('Please select courses');
    //  return;
    //}
    let that = this;
    this._api.post('/courseapi/feeenrollment/update', payLoad).subscribe({
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
  };
  onCancel() {
    this.dialogRef.close(false);
  }
  //toggleAllSelection() {
  //  if (this.allSelected) {
  //    this.select?.options.forEach((item: MatOption) => item.select());
  //  } else {
  //    this.select?.options.forEach((item: MatOption) => item.deselect());
  //  }
  //}
  //optionClick() {
  //  let newStatus = true;
  //  this.select?.options.forEach((item: MatOption) => {
  //    if (!item.selected) {
  //      newStatus = false;
  //    }
  //  });
  //  this.allSelected = newStatus;
  //}
}
