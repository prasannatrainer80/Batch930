import { Component, OnInit, Inject } from '@angular/core';
import { APICallService, CommonService } from '@core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adddivision',
  templateUrl: './adddivision.component.html',
  styleUrls: ['./adddivision.component.scss']
})
export class AdddivisionComponent implements OnInit {
  efform!: UntypedFormGroup;
  addDivInfo: any = {}
  action: string;
  dialogTitle: string;

  coursetypesList: any[] = [];
  semList: any[] = [];
  agentsList: any[] = [];

  coursecodes: any[] = [];
  mindate: Date;
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<AdddivisionComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.coursetypesList = [];
    this.semList = [];
    this.agentsList = [];
    this.mindate = new Date();
    this.action = data.action;
    this.addDivInfo = {
      ctype: "",
      scode: "",
      term: "",
      isnew: "",
      weeks: "",
      wsdate: "",
      hours: ""
    }
    this.dialogTitle = "Add Semester Division"
  }
  ngOnInit() {
    this.loadCourseTypes();
    //this.loadSemesters();

  }

  //loadSemesters() {
  //  let that = this;
  //  this._api.HttpPost(this.endpoints.tt_sems_get, { ctypecode: ctype }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.agentsList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

  loadCourseTypes() {
    let that = this;
    this._api.post('/appapi/coursetype/list', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          const index = resp.data.list.findIndex((item: any) => item.code.toUpperCase() === "ELICOS");
          if (index > -1)
            resp.data.list.splice(index, 1);
          that.coursetypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onChangeCourseType(ctype: any) {
    this.loadSemesters(ctype);
  }
  loadSemesters(ctype: string) {
    let that = this;
    this._api.post('/timetableapi/Semester/GetSemByCtype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.semList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onSubmit() {

    let weekstartdate = this.datePipe.transform(this.addDivInfo.wsdate, "yyyy-MM-dd");

    let payLoad = {
      ctype: this.addDivInfo.ctype,
      scode: this.addDivInfo.scode,
      term: this.addDivInfo.term,
      isnew: this.addDivInfo.isnew,
      weeks: this.addDivInfo.weeks,
      wsdate: weekstartdate,
      hours: this.addDivInfo.hours
    };


    if (this._api.isEmpty(this.addDivInfo.ctype)) {
      this._api.errorNotify('Please select course type');
      return;
    }
    if (this._api.isEmpty(payLoad.scode)) {
      this._api.errorNotify('Please select semester');
      return;
    }
    if (this._api.isEmpty(payLoad.term)) {
      this._api.errorNotify('Please enter term number');
      return;
    }

    if (this._api.isEmpty(payLoad.isnew)) {
      this._api.errorNotify('Please select term adding type');
      return;
    }
    if (this._api.isEmpty(this.addDivInfo.wsdate)) {
      this._api.errorNotify('Please select week start date');
      return;
    }
    if (!this.checkifisMonday(payLoad.wsdate)) {
      this._api.errorNotify('Week start date should be monday');
      return;
    }

    if (this._api.isEmpty(payLoad.hours)) {
      this._api.errorNotify('Please enter hours');
      return;
    }
    var t = parseFloat(payLoad.hours);
    if (isNaN(t) || t < 0 || t > 100) {
      this._api.errorNotify('Please enter valid hours');
      return;
    }
    let that = this;
    this._api.post('/timetableapi/Semester/AddTerm', payLoad).subscribe({
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

  checkifisMonday(dateStr: any) {
    // Parse the input date string (assuming it's in the format "YYYY-MM-DD")
    const [year, month, day] = dateStr.split('-').map(Number);

    // Create a Date object
    const inputDate = new Date(year, month - 1, day); // Note: month is 0-based

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = inputDate.getDay();

    // Check if it's Monday
    return dayOfWeek === 1;
  }
}
