import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
import * as moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-addbreak',
  templateUrl: './addbreak.component.html',
  styleUrls: ['./addbreak.component.scss']
})
export class AddBreakComponent implements OnInit {
  addbreakform!: UntypedFormGroup;
  addbreak: any = {}
  dialogTitle: string;
  wkday: any[] = [];
  weekDaysList: any[] = [];
  startTimesList: any[] = [];
  endTimesList: any[] = [];
  TimesList: any[] = [];
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  batchdata: any = {};
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<AddBreakComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.weekDaysList = [];
    this.startTimesList = [];
    this.endTimesList = [];
    this.wkday = [];
    this.addbreak = {
      stwk: "",
      edwk: "",
      wkday: "",
      starttime: "",
      endtime: "",
      teacher: "",
      classtype:""
    }
    this.dialogTitle = "Add Break"
    this.batchdata = data;
  }
  ngOnInit() {
    this.generateTimesList();
    this.loadWeekDays();
    this.getBatchdetails(this.batchdata.bcode)
  }

  getBatchdetails(code: any) {
    let that = this;
    this._api.post('/timetableapi/manage/getbatchdetails', { code: code }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          let _data = resp.data.list[0];
          that.addbreak.stwk = _data.sweek;
          that.addbreak.edwk = _data.eweek;
          that.addbreak.teacher = _data.teachername;
          that.addbreak.classtype = _data.classtype;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  generateTimesList() {
    const language: string = window.navigator.language;
    const interval: number = 5;
    const ranges: any[] = [];
    const date = new Date();
    const format: any = {
      hour: 'numeric',
      minute: 'numeric',
    };

    for (let minutes = 0; minutes < 24 * 60; minutes = minutes + interval) {
      date.setHours(0);
      date.setMinutes(minutes);
      ranges.push(date.toLocaleTimeString(language, format));
    }

    this.TimesList = ranges;
    this.startTimesList = this.TimesList;
    this.endTimesList = this.TimesList;
  }


  loadWeekDays() {
    let that = this;
    this._api.post('/timetableapi/manage/getweekdays', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.weekDaysList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }





  onSubmit() {
    let wkdays = this.addbreak.wkday.join(',');
    let payLoad = {
      wkdays: wkdays,
      stime: this.addbreak.starttime,
      etime: this.addbreak.endtime,
      cbcode: this.batchdata.bcode
    };
    if (this._api.isEmpty(payLoad.wkdays)) {
      this._api.errorNotify('Please select week days');
      return;
    }
    if (this._api.isEmpty(payLoad.stime)) {
      this._api.errorNotify('Please select start time');
      return;
    }
    if (this._api.isEmpty(payLoad.etime)) {
      this._api.errorNotify('Please select end time');
      return;
    }

    let that = this;
    this._api.post('/timetableapi/manage/setupbreaktime', payLoad).subscribe({
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

