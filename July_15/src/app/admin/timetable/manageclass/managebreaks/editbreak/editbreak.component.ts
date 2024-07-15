import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';

@Component({
  selector: 'app-editbreak',
  templateUrl: './editbreak.component.html',
  styleUrls: ['./editbreak.component.scss']
})
export class EditBreakComponent implements OnInit {
  editbreakform!: UntypedFormGroup;
  editbreak: any = {}
  dialogTitle: string;
  startTimesList: any[] = [];
  endTimesList: any[] = [];
  TimesList: any[] = [];
  //@ViewChild('select') select: MatSelect | undefined;
  //allSelected = false;
  breakdata: any = {};
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<EditBreakComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.startTimesList = [];
    this.endTimesList = [];
    this.editbreak = {
      stwk: "",
      edwk: "",
      wkday: "",
      starttime: "",
      endtime: ""
    }
    this.dialogTitle = "Edit Break"
    this.breakdata = data;
  }
  ngOnInit() {
    this.generateTimesList();
    //this.loadWeekDays();
    console.log(this.breakdata);
    this.editbreak.starttime = this.breakdata.data.stime;
    this.editbreak.endtime = this.breakdata.data.etime;
    this.editbreak.wkname = this.breakdata.data.wkname;
    //this.getBatchdetails(this.batchdata.clscode)
  }

  //getBatchdetails(code: any) {
  //  let that = this;
  //  this._api.post('/timetableapi/manage/getbatchdetails', { code: code }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        let _data = resp.data.list[0];
  //        that.editbreak.stwk = _data.teachercode;
  //        that.editbreak.edwk = _data.teachercode;
  //        //that.addbreak.stwk = _data.teachercode;
  //        //that.addbreak.stwk = _data.teachercode;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

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



  parseTime(t) {
    var d = new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
  }



  onSubmit() {
    let payLoad = {
      stime: this.editbreak.starttime,
      etime: this.editbreak.endtime,
      code: this.breakdata.data.code
    };

    if (this._api.isEmpty(payLoad.stime)) {
      this._api.errorNotify('Please select start time');
      return;
    }
    if (this._api.isEmpty(payLoad.etime)) {
      this._api.errorNotify('Please select end time');
      return;
    }
    if (payLoad.stime === payLoad.etime) {
      this._api.errorNotify('Start time and end time should not same');
      return;
    }
    if (this.parseTime(payLoad.stime) > this.parseTime(payLoad.etime)) {
      this._api.errorNotify('Start time should not be greater than end time');
      return;
    }
    let that = this;
    this._api.post('/timetableapi/manage/updatebreak', payLoad).subscribe({
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
  
}

