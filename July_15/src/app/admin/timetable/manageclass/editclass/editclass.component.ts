import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
import * as moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.scss']
})
export class EditclassComponent implements OnInit {
  editclassform!: UntypedFormGroup;
  editclasstt: any = {}
  dialogTitle: string;
  term: string = "";
  campusesList: any[] = [];
  coursetypesList: any[] = [];
  subjectsList: any[] = [];
  wkday: any[] = [];
  calendartypesList: any[] = [];
  attendanceTypesList: any[] = [];
  weekDaysList: any[] = [];
  classTypesList: any[] = [];
  semList: any[] = [];
  stweeksList: any[] = [];
  edweeksList: any[] = [];
  years: any[] = [];
  year: any = [];
  calcode: any = [];
  ctype: string = "";
  assessorList: any[] = [];
  startTimesList: any[] = [];
  endTimesList: any[] = [];
  venuesList: any[] = [];
  teachersList: any[] = [];
  mindate: Date;
  TimesList: any[] = [];
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  batchData: any = {};
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<EditclassComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.batchData = data.data;
    this.mindate = new Date();
    this.campusesList = [];
    this.coursetypesList = [];
    this.subjectsList = [];
    this.calendartypesList = [];
    this.attendanceTypesList = [];
    this.weekDaysList = [];
    this.classTypesList = [];
    this.semList = [];
    this.stweeksList = [];
    this.edweeksList = [];
    this.assessorList = [];
    this.startTimesList = [];
    this.endTimesList = [];
    this.venuesList = [];
    this.teachersList = [];
    this.wkday = [];
    this.editclasstt = {
      year: "",
      stwk: "",
      edwk: "",
      subject: "",
      teacher: "",
      attendacetype: "",
      wkday: "",
      classtype: "",
      starttime: "",
      endtime: "",
      venue: "",
      capacity: ""
    }
    this.dialogTitle = "Edit Class"
  }
  ngOnInit() {
    this.generateTimesList();
    //this.loadCampuses();
    //this.loadCourseTypes();
    // this.loadCalendarSets();
    //this.loadAssessors();
    this.loadVenues();
    this.loadClassTypes();
    this.loadAttendanceTypes();
    this.loadWeekDays();
    this.GetBatchDetails(this.batchData);
    this.loadTeachersBySubject(this.batchData.subcode);
  }

  GetBatchDetails(data: any) {
    let that = this;
    let payLoad = {
      code: data.batchcode
    }

    this._api.post('/timetableapi/manage/getbatchdetails', payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          let _data = resp.data.list[0];
          that.editclasstt.stwk = _data.sweek;
          that.editclasstt.edwk = _data.eweek;
          that.editclasstt.teacher = _data.teachercode;
          that.editclasstt.attendacetype = _data.attendancetype;
          that.editclasstt.wkday = _data.wkcode;
          that.editclasstt.classtype = _data.classtype;
          that.editclasstt.starttime = _data.stime;
          that.editclasstt.endtime = _data.etime;
          that.editclasstt.venue = _data.venuecode;
          that.editclasstt.capacity = _data.capacity;
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

  loadVenues() {
    let that = this;
    this._api.post('/timetableapi/manage/getvenues', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.venuesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  loadAttendanceTypes() {
    let that = this;
    this._api.post('/timetableapi/manage/getattendancetypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.attendanceTypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
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

  loadClassTypes() {
    let that = this;
    this._api.post('/timetableapi/manage/getclasstypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.classTypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  loadTeachersBySubject(subcode: any) {
    let that = this;
    this._api.post('/timetableapi/manage/getteachersbysubject', { subcode: subcode }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.teachersList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }


  //loadCampuses() {
  //  let that = this;
  //  this._api.post('/appapi/masters/getcampuses', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0' && resp.data.list.length > 0) {
  //        that.campusesList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}



  //loadAssessors() {
  //  let that = this;
  //  this._api.post('/timetableapi/manage/getassessors', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0' && resp.data.list.length > 0) {
  //        that.assessorList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

  //loadCourseTypes() {
  //  let that = this;
  //  this._api.post('/appapi/coursetype/list', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0' && resp.data.list.length > 0) {
  //        const index = resp.data.list.findIndex((item: any) => item.code.toUpperCase() === "ELICOS");
  //        if (index > -1)
  //          resp.data.list.splice(index, 1);
  //        that.coursetypesList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

  //loadCalendarSets() {
  //  let that = this;
  //  this._api.post('/timetableapi/Calendar/CalendarTypes', {}).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.calendartypesList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}



  //loadSubjectsByCalCode(calcode: any) {
  //  let that = this;
  //  this._api.post('/timetableapi/manage/getsubjectsbycalendarctype', { calcode: calcode, ctype: that.addclasstt.ctype, year: '2024' }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.subjectsList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}



  //loadSemesters(ctype: string) {
  //  let that = this;
  //  this._api.post('/timetableapi/semester/getsembyctype', { ctypecode: ctype }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.semList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

  //loadSemWeeks() {
  //  let that = this;
  //  this._api.post('/timetableapi/semester/weeksbysemterm', { scode: that.editclasstt.scode, term: that.editclasstt.term }).subscribe({
  //    next(resp: any) {
  //      if (resp.code == '0') {
  //        that.stweeksList = resp.data.list;
  //        that.edweeksList = resp.data.list;
  //      }
  //    },
  //    error(msg: any) {
  //      console.log(msg);
  //    },
  //  });
  //}

  //onChangeSem(stcode: any) {
  //  this.loadSemWeeks();
  //}

  //onChangeTerm(stcode: any) {
  //  this.loadSemWeeks();
  //}
  //onChangeSubject(subcode: any) {
  //  this.loadTeachersBySubject(subcode);
  //}
  //onChangeCourseType(ctype: any) {
  //  //this.loadSemesters(ctype);
  //}
  //onChangeCalendarType(calcode: any) {
  //  // this.loadSubjectsByCalCode(calcode);
  //}
  parseTime(t) {
    var d = new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
  }

  onSubmit() {
    let payLoad = {
      code: this.batchData.batchcode,
      teachercode: this.editclasstt.teacher,
      venuecode: this.editclasstt.venue,
      wkcode: this.editclasstt.wkday,
      attendancetype: this.editclasstt.attendacetype,
      classtype: this.editclasstt.classtype,
      stime: this.editclasstt.starttime,
      etime: this.editclasstt.endtime,
      capacity: this.editclasstt.capacity
    };
    if (this._api.isEmpty(payLoad.code)) {
      this._api.errorNotify('Code should not be empty');
      return;
    }
    if (this._api.isEmpty(payLoad.teachercode)) {
      this._api.errorNotify('Please select teacher');
      return;
    }
    if (this._api.isEmpty(payLoad.venuecode)) {
      this._api.errorNotify('Please select venue');
      return;
    }
    if (this._api.isEmpty(payLoad.wkcode)) {
      this._api.errorNotify('Please select day');
      return;
    }
    if (this._api.isEmpty(payLoad.attendancetype)) {
      this._api.errorNotify('Please select attendance type');
      return;
    }
    if (this._api.isEmpty(payLoad.classtype)) {
      this._api.errorNotify('Please select class type');
      return;
    }
    if (this._api.isEmpty(payLoad.stime)) {
      this._api.errorNotify('Please select Start time');
      return;
    }
    if (this._api.isEmpty(payLoad.etime)) {
      this._api.errorNotify('Please select End time');
      return;
    }
    if (this._api.isEmpty(payLoad.capacity)) {
      this._api.errorNotify('Please enter class capacity');
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
    this._api.post('/timetableapi/manage/updatebatch', payLoad).subscribe({
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

