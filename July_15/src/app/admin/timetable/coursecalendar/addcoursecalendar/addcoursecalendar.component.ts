import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { APICallService, CommonService } from '@core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-addcoursecalendar',
  templateUrl: './addcoursecalendar.component.html',
  styleUrls: ['./addcoursecalendar.component.scss']
})
export class AddcoursecalendarComponent implements OnInit {
  efform!: UntypedFormGroup;
  addSP: any = {}
  dialogTitle: string;

  coursetypesList: any[] = [];
  coursesList: any[] = [];
  coursecodes: any[] = [];
  calendartypesList: any[] = [];
  years: any[] = [];
  year: any = [];
  calcode: string = "";
  ctype: string = "";
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<AddcoursecalendarComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.coursetypesList = [];
    this.coursesList = [];
    this.addSP = {
      ctype: "",
      year: "",
      calcode: "",
      coursestatus: "",
      coursecode: ""
    }
    this.dialogTitle = "Add Study Period"
  }
  ngOnInit() {
    this.loadYears();
    this.loadCourseTypes();
    this.loadCalendarSets();
  }
  loadYears() {
    let that = this;
    this._api.post('/timetableapi/Calendar/CalendarYears', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.years = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  loadCalendarSets() {
    let that = this;
    this._api.post('/timetableapi/Calendar/CalendarTypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.calendartypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }



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

  onChangeCourse(option: any) {

    //if (option.toString() == "ALL")
    //  this.allCoursesSelected = true;
    //else if (option.length == this.coursesList.length) {
    //  this.allCoursesSelected = true;
    //}
    //else { this.allCoursesSelected = false; }

  }

  onChangeCourseType(ctype: any) {
    this.addSP.coursestatus = "1";
  }
  onChangeCourseStatus(staus: any) {
    if (this._api.isEmpty(this.addSP.ctype)) {
      this._api.errorNotify('Please select course type');
      return;
    }
    this.loadCourses(this.addSP.ctype, staus);
  }
  loadCourses(ctype: any, status: any) {
    let that = this;
    this._api.post('/courseapi/manage/listbycoursetype', { ctypecode: ctype, status: status }).subscribe({
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
  onSubmit() {
    let cc = this.coursecodes.join(',');
    let payLoad = {
      ctype: this.addSP.ctype,
      year: this.addSP.year,
      calcode: this.addSP.calcode,
      coursecodes: cc
    };
    if (this._api.isEmpty(payLoad.calcode)) {
      this._api.errorNotify('Please select calendar type');
      return;
    }
    if (this._api.isEmpty(payLoad.year)) {
      this._api.errorNotify('Please select year');
      return;
    }
    if (this._api.isEmpty(payLoad.ctype)) {
      this._api.errorNotify('Please select course type');
      return;
    }
    if (this._api.isEmpty(payLoad.coursecodes)) {
      this._api.errorNotify('Please select courses');
      return;
    }
    if (payLoad.coursecodes.toString().toLocaleLowerCase() == "all") {
        let ccodes: any[] = []
      let crs = this.coursesList.filter(a => a.code != "all");
        crs.forEach((ele) => {
          ccodes.push(ele.code);
        });
        payLoad.coursecodes = ccodes.toString();
    }
    let that = this;
    this._api.post('/timetableapi/Calendar/AddCourseCalendar', payLoad).subscribe({
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
