import { Component, Inject,ViewChild } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import * as moment from 'moment';
@Component({
  selector: 'app-vet-intake-add',
  templateUrl: './vet-intake-add.component.html',
  styleUrls: ['./vet-intake-add.component.scss']
})
export class VetIntakeAddComponent {
  csubform!: UntypedFormGroup;
  intakeInfo: any = {};
  action: string;
  dialogTitle: string;
  course: any = {};
  coursesList: any[] = [];
  originsList: any[] = [];
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  mindate: Date;
  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<VetIntakeAddComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.coursesList = [];
    this.originsList = [];
    this.mindate = new Date();
    this.intakeInfo = {
      coursecodes: "",
      name: "",
      duration: "0",
      durationtype: "A",
      startdate: "",
      ispublish: false,
      createtime: "",
      template: "",
      origincode: "",
    }
    this.dialogTitle = "Add VET Intake";
  }
  ngOnInit() {
    this.loadCoursesByCTypes('VET');
    this.loadOrigins();
  }
  onSubmit() {
    let payLoad = {
      ctypecode: this.data.coursetypecode,
      coursecodes: this.intakeInfo.coursecodes,
      name: this.intakeInfo.name,
      duration: this.intakeInfo.duration,
      durationtype: this.intakeInfo.durationtype,
      startdate: this.intakeInfo.startdate,
      ispublish: this.intakeInfo.ispublish ? "1" : "0",
      origincode:this.intakeInfo.origincode
    };

    if (this._api.isEmpty(this.intakeInfo.coursecodes)) {
      this._api.errorNotify('Please select courses');
      return;
    }
    else {
      // if (this.intakeInfo.coursecodes == "-1") {
      //   let ccodes: any[] = []
      //   let crs = this.coursesList.filter(a => a.code != "-1");
      //   crs.forEach((ele) => {
      //     ccodes.push(ele.code);
      //   });
      //   payLoad.coursecodes = ccodes.toString();
      // }
      // else {
        payLoad.coursecodes = this.intakeInfo.coursecodes.toString();
    //  }
    }

    if (this._api.isEmpty(this.intakeInfo.name)) {
      this._api.errorNotify('Please enter intake name');
      return;
    }

    if (this._api.isEmpty(this.intakeInfo.startdate)) {
      this._api.errorNotify('Please select intake start date');
      return;
    }
    else {
      let val = formatDate(this.intakeInfo.startdate, 'yyyy-MM-dd HH:mm:ss', 'en-GB');
      payLoad.startdate = val;
    }
    if (this._api.isEmpty(this.intakeInfo?.origincode)) {
      this._api.errorNotify('Please select intake receiver');
      return;
    }

    let that = this;
    this._api.post('/courseapi/Intake/add', payLoad).subscribe({
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
          // let data = resp.data.list;
          // data.unshift({ coursetypecode: '', code: '-1', name: 'ALL' });
          that.coursesList = resp.data.list;
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
  toggleAllSelection() {
    if (this.allSelected) {
      this.select?.options.forEach((item: MatOption) => item.select());
    } else {
      this.select?.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick() {
    let newStatus = true;
    this.select?.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
}
