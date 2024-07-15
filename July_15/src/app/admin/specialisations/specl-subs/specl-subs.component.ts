import { Component, Inject } from '@angular/core';
import { APICallService,CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-specl-subs',
  templateUrl: './specl-subs.component.html',
  styleUrls: ['./specl-subs.component.scss']
})
export class SpeclSubsComponent {
  csubform!: UntypedFormGroup;
  action: string;
  dialogTitle: string;
  subcode: string = "";
  speclcode: string = "";
  coursecode: string = "";
  speclname: string = "";
  subjectsList: any[] = [];
  constructor(private _api: APICallService, private _common: CommonService,
    public dialogRef: MatDialogRef<SpeclSubsComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.coursecode = data.coursecode;
    this.speclcode = data.speclcode;
    this.speclname = data.speclname;
    this.subjectsList = [];
    this.dialogTitle = "Add Subject Under Specialisation:" + this.speclname
  }
  ngOnInit() {
    this.loadSubjects();
  }
  onSubmit() {
    let payLoad = {
      coursecode: this.coursecode,
      subcode: this.subcode,
      spcode: this.speclcode
    };

    if (this._common.isEmpty(this.subcode)) {
      this._common.errorNotify('Please select subject');
      return;
    }

    let that = this;
    this._api.post('/courseapi/SpecSub/Add', payLoad).subscribe({
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
  loadSubjects() {
    let that = this;
    let payLoad ={
      orderColumn: "createdate",
      orderDir: "ASC",
      start: "0",
      pageSize: "20"
  }
    this._api.post('/courseapi/Subjects/List',payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.subjectsList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
}
