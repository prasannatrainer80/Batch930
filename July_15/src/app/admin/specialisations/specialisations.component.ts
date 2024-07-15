
import {
  Component,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { APICallService, CommonService } from '@core';
import { SpeclAddComponent } from './specl-add/specl-add.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpeclSubsComponent } from './specl-subs/specl-subs.component';
@Component({
  selector: 'app-specialisations',
  templateUrl: './specialisations.component.html',
  styleUrls: ['./specialisations.component.scss']
})
export class SpecialisationsComponent
  implements OnInit, AfterViewInit {
  speclList: any[] = [];
  coursesList: any[] = [];
  coursecode: string = "";
  coursename: string = "";
  public notifyText: string = "";
  public breadscrums: any = [
    {
      title: '',
      items: [],
      active: 'Course Specialisation',
    },
  ];

  constructor(private _api: APICallService, private _common: CommonService, public dialog: MatDialog, private _router: Router) {
    this.coursesList = [];
  }
  ngOnInit() {
    this.onChangeCourseType('VET');
  }
  ngAfterViewInit() {
  }
  addNew() {
    if (this.coursecode == "" || this.coursecode == undefined) {
      this._api.errorNotify('Please select course');
      return;
    }
    let course = this.coursesList.filter(a => a.code == this.coursecode);

    const dialogRef = this.dialog.open(SpeclAddComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
        coursecode: this.coursecode,
        coursename: course[0].name
      },
      // direction: 'ltr',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.refresh();
      }
    });
  }

  onChangeCourseType(ctype: any) {
    this.loadCoursesByCTypes(ctype);
  }
  loadCoursesByCTypes(ctype: string) {
    let that = this;
    this._api.post('/courseapi/manage/listbycoursetype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.coursesList = resp.data.list;
          that.coursecode = resp.data.list[0].code;
          that.onChangeCourse(resp.data.list[0].code)
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeCourse(coursecode: string) {
    this.loadData(coursecode);
  }
  loadData(coursecode: string) {
    let that = this;
    let payLoad = {
      coursecode: coursecode,
    };
    this.speclList = [];
    this._api.post('/courseapi/Specialisations/List', payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          let data = resp.data.list;
          if (data.length > 0) {

            data.forEach((ele: any, index: number, arr: any) => {
              if (ele.splSubjects != "" && ele.splSubjects != undefined) {
                ele.splSubjects = JSON.parse(ele.splSubjects);
              }
            });
          }
          that.speclList = data;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  refresh() {
    this.loadData(this.coursecode);
  }
  StatusChange(row: any, status: number) {
    let that = this;
    let payLoad = { code: row.code, status: status };
    return this._api.post('/courseapi/Specialisations/UpdateStatus', payLoad).subscribe({
      next(resp: any) {
        if (resp != null && resp.code == '0') {
          that._api.successNotify(resp.message)
          that.refresh();
        } else {
          that._api.errorNotify(resp?.message)
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify('Something went wrong!')
      },
    });
  }
  SubjectStatusChange(spl: any, splSub: any, status: number) {
    let that = this;
    let payLoad = { code: splSub.code, status: status };
    return this._api.post('/courseapi/SpecSub/UpdateStatus', payLoad).subscribe({
      next(resp: any) {
        if (resp != null && resp.code == '0') {
          that._api.successNotify(resp.message)
          that.refresh();
        } else {
          that._api.errorNotify(resp?.message)
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify('Something went wrong!')
      },
    });
  }
  AddSubject(spl: any) {
    const dialogRef = this.dialog.open(SpeclSubsComponent, {
      maxWidth: '118vw',
      maxHeight: '118vh',
      height: '95%',
      width: '95%',
      panelClass: 'full-screen-modal',
      disableClose: true,
      data: {
        action: 'add',
        coursecode: this.coursecode,
        speclcode: spl.spcode,
        speclname: spl.specialisation
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.refresh();
      }
    });
  }
}
