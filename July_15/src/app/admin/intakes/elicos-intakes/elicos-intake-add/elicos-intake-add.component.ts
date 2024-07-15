import { Component, Inject, ViewChild } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-elicos-intake-add',
  templateUrl: './elicos-intake-add.component.html',
  styleUrls: ['./elicos-intake-add.component.scss']
})
export class ElicosIntakeAddComponent {
  csubform!: UntypedFormGroup;
  intakeInfo: any = {};
  action: string;
  dialogTitle: string;
  course: any = {};
  coursesList: any[] = [];
  originsList: any[] = [];
  startdatesList: any[] = [];
  years: number[] = [];
  @ViewChild('select') select: MatSelect | undefined;
  @ViewChild('selectdates') selectdates: MatSelect | undefined;
  allSelected = false;
  allSelectedDates = false;
  constructor(private _api: APICallService, 
    public dialogRef: MatDialogRef<ElicosIntakeAddComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.coursesList = [];
    this.originsList = [];
    this.startdatesList = [];
    this.years = [];
    this.intakeInfo = {
      coursecodes: "",
      year: "",
      startdates: "",
      name: "",
      duration: "0",
      durationtype: "A",
      ispublish: false,
      createtime: "",
      template: "",
      origincode: "",
    }
    this.dialogTitle = "Add ELICOS Intake";
  }
  ngOnInit() {
    this.years = this.getYears();
    this.loadCoursesByCTypes('ELICOS');
    this.loadOrigins();
  }
  getYears() {
    var currentYear = new Date().getFullYear(), years = [];
    let endYear = currentYear + 5;
    for (let index = currentYear; index < endYear; index++) {
      this.years.push(index);
    }
    this.GetIntakeStartDatesList(currentYear);
    return this.years;
  }
  onSubmit() {
    let payLoad = {
      ctypecode: this.data.coursetypecode,
      coursecodes: this.intakeInfo.coursecodes,
      name: this.intakeInfo.name,
      duration: this.intakeInfo.duration,
      durationtype: this.intakeInfo.durationtype,
      startdates: this.intakeInfo.startdates,
      ispublish: this.intakeInfo.ispublish ? "1" : "0",
      origincode: this.intakeInfo.origincode
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
      // }
    }

    if (this._api.isEmpty(this.intakeInfo.name)) {
      this._api.errorNotify('Please enter intake name');
      return;
    }
    if (this._api.isEmpty(this.intakeInfo.startdates)) {
      this._api.errorNotify('Please select intake start dates');
      return;
    }
    else {
      if (this.intakeInfo.startdates == "ALL") {
        let startsDates: any[] = []
        let dts = this.startdatesList.filter(a => a != "ALL");
        dts.forEach((ele) => {
          startsDates.push(ele);
        });
        payLoad.startdates = startsDates.toString();
      }
      else {
        payLoad.startdates = this.intakeInfo.startdates.toString();
      }
    }
    let that = this;
    this._api.post('/courseapi/Intake/AddElicos', payLoad).subscribe({
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
  onChangeYear(year: number) {
    this.GetIntakeStartDatesList(year);
  }
  GetIntakeStartDatesList(year: number) {
    let that = this;
    this._api.post('/courseapi/Intake/GetIntakeStartDatesList', { year: year }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          let data = resp.data.list;
          //data.unshift('ALL');
          that.startdatesList = data;
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
  toggleAllSelectionDates() {
    if (this.allSelectedDates) {
      this.selectdates?.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectdates?.options.forEach((item: MatOption) => item.deselect());
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
  optionDatesClick() {
    let newStatus = true;
    this.selectdates?.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelectedDates = newStatus;
  }
}
