import { Component, Inject } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-cs-add',
  templateUrl: './cs-add.component.html',
  styleUrls: ['./cs-add.component.scss']
})
export class CsAddComponent {
  csubform!: UntypedFormGroup;
  csubInfo: any = {};
  action: string;
  dialogTitle: string;
  course: any = {};
  subjectsList: any[] = [];
  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<CsAddComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any, private _common: CommonService) {
    this.action = data.action;
    this.course = data.data;
    this.csubInfo = {
      coursetypecode: this.course.coursetypecode,
      coursecode: this.course.coursecode,
      subcode: "",
      stage: "",
      subtype: "",
      subfee: "",
      isincludedocs: false,
    }
    this.dialogTitle = "Add Subject Under Course:" + this.course.coursename
    this.subjectsList = [];
  }
  ngOnInit() {
    this.loadSubjects();
  }
  onSubmit() {
    let payLoad = {
      coursetypecode: this.course.coursetypecode,
      coursecode: this.course.coursecode,
      stage: this.csubInfo.stage,
      subcode: this.csubInfo.subcode,
      subtype: this.csubInfo.subtype,
      subfee: this.csubInfo.subfee,
      isincludedocs: this.csubInfo.isincludedocs ? "1" : "0",
    };

    if (this._api.isEmpty(this.csubInfo.subcode)) {
      this._common.errorNotify('Please select subject');
      return;
    }

    if (this._common.isEmpty(this.csubInfo.stage)) {
      this._common.errorNotify('Please select subject stage');
      return;
    }

    if (this._common.isEmpty(this.csubInfo.subtype)) {
      this._common.errorNotify('Please select subject type');
      return;
    }
    if (!this._api.checkPrice(this.csubInfo.subfee, false)) {
      this._common.errorNotify('Please enter valid subject fee');
      return;
    }

    let that = this;

    this._api.post('/courseapi/CourseSub/Add', payLoad).subscribe({
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
    let payLoad = {
      orderColumn: "createdate",
      orderDir: "ASC",
      start: "0",
      pageSize: "20"
    }

    this._api.post('/courseapi/Subjects/List', payLoad).subscribe({
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
