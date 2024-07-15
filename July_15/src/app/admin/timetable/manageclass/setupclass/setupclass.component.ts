import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
import * as moment from 'moment';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-setupclass',
  templateUrl: './setupclass.component.html',
  styleUrls: ['./setupclass.component.scss']
})
export class SetupclassComponent implements OnInit {
  addclassform!: UntypedFormGroup;
  addclasstt: any = {}
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
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<SetupclassComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
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
    this.addclasstt = {
      campus: "",
      ctype: "",
      term: "",
      year: "",
      caltype: "",
      coursestatus: "",
      coursecode: "",
      scode: "",
      stwk: "",
      edwk: "",
      censusdate: "",
      assessor: "",
      subject: "",
      batch: "",
      teacher: "",
      attendacetype: "",
      wkday: "",
      classtype: "",
      isdefaulttt: "",
      starttime: "",
      endtime: "",
      venue: "",
      capacity: ""
    }
    this.dialogTitle = "Setup Class"
  }
  ngOnInit() {
    this.generateTimesList();
    this.loadCampuses();
    this.loadCourseTypes();
    this.loadCalendarSets();
    this.loadAssessors();
    this.loadVenues();
    this.loadClassTypes();
    this.loadAttendanceTypes();
    this.loadWeekDays();
  }

  generateTimesList() {
    ////const locale = 'en'; // or whatever you want...
    //const hours:any = [];

    ////moment.locale(locale);  // optional - can remove if you are only dealing with one locale

    //for (let hour = 0; hour < 24; hour++) {
    //  hours.push(moment({ hour }).format('h:mm A'));
    //  hours.push(
    //    moment({
    //      hour,
    //      minute: 5
    //    }).format('h:mm A')
    //  );
    //}
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



  loadCampuses() {
    let that = this;
    this._api.post('/appapi/masters/getcampuses', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.campusesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
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

  loadAssessors() {
    let that = this;
    this._api.post('/timetableapi/manage/getassessors', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.assessorList = resp.data.list;
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

  loadSubjectsByCalCode(calcode: any) {
    let that = this;
    this._api.post('/timetableapi/manage/getsubjectsbycalendarctype', { calcode: calcode, ctype: that.addclasstt.ctype, year: '2024' }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.subjectsList = resp.data.list;
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

  loadSemesters(ctype: string) {
    let that = this;
    this._api.post('/timetableapi/semester/getsembyctype', { ctypecode: ctype }).subscribe({
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

  loadSemWeeks() {
    let that = this;
    this._api.post('/timetableapi/semester/weeksbysemterm', { scode: that.addclasstt.scode, term: that.addclasstt.term }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.stweeksList = resp.data.list;
          that.edweeksList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onChangeSem(stcode: any) {
    this.loadSemWeeks();
  }

  onChangeTerm(stcode: any) {
    this.loadSemWeeks();
  }
  onChangeSubject(subcode: any) {
    this.loadTeachersBySubject(subcode);
  }
  onChangeCourseType(ctype: any) {
    this.loadSemesters(ctype);
  }
  onChangeCalendarType(calcode: any) {
    this.loadSubjectsByCalCode(calcode);
  }


  onSubmit() {
    alert(this.addclasstt.wkday);
    let wkdays = this.addclasstt.wkday.join(',');
    alert(wkdays);
    let payLoad = {
      campuscode: this.addclasstt.campus,
      ctype: this.addclasstt.ctype,
      calcode: this.addclasstt.caltype,
      scode: this.addclasstt.scode,
      stcode: '',
      term: this.addclasstt.term,
      sweek: this.addclasstt.stwk,
      eweek: this.addclasstt.edwk,
      subcode: this.addclasstt.subject,
      attendancetype: this.addclasstt.attendacetype,
      classtype: this.addclasstt.classtype,
      wkdays: wkdays,
      stime: this.addclasstt.starttime,
      etime: this.addclasstt.endtime,
      venuecode: this.addclasstt.venue,
      capacity: this.addclasstt.capacity,
      usedefault: this.addclasstt.isdefaulttt,
      teachercode: this.addclasstt.teacher,
      batchname: "",
      hasassessment: 0,
      assessor: this.addclasstt.assessor,
      censusdate: this.addclasstt.censusdate
    };
    if (this._api.isEmpty(payLoad.campuscode)) {
      this._api.errorNotify('Please select campus');
      return;
    }
    //if (this._api.isEmpty(payLoad.year)) {
    //  this._api.errorNotify('Please select year');
    //  return;
    //}
    if (this._api.isEmpty(payLoad.ctype)) {
      this._api.errorNotify('Please select course type');
      return;
    }
    if (this._api.isEmpty(payLoad.calcode)) {
      this._api.errorNotify('Please select calendar type');
      return;
    }
    if (this._api.isEmpty(payLoad.scode)) {
      this._api.errorNotify('Please select semester');
      return;
    }
    if (this._api.isEmpty(payLoad.term)) {
      this._api.errorNotify('Please select term');
      return;
    }
    if (this._api.isEmpty(payLoad.sweek)) {
      this._api.errorNotify('Please select Start Week');
      return;
    }
    if (this._api.isEmpty(payLoad.eweek)) {
      this._api.errorNotify('Please select End Week');
      return;
    }
    if (this._api.isEmpty(payLoad.subcode)) {
      this._api.errorNotify('Please select subject');
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
    if (this._api.isEmpty(payLoad.venuecode)) {
      this._api.errorNotify('Please select venue');
      return;
    }
    if (this._api.isEmpty(payLoad.capacity)) {
      this._api.errorNotify('Please enter class capacity');
      return;
    }

    let that = this;
    this._api.post('/timetableapi/manage/addclass', payLoad).subscribe({
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

