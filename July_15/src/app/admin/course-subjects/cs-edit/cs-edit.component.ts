
import { Component, Inject } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
import { APICallService, CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-cs-edit',
  templateUrl: './cs-edit.component.html',
  styleUrls: ['./cs-edit.component.scss']
})
export class CsEditComponent {
  csubform!: UntypedFormGroup;
  csubInfo: any = {};
  action: string;
  dialogTitle: string;
  csubData: any = {};
  subjectsList: any[] = [];
  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<CsEditComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.csubData = data.data;
    this.csubInfo = {
      coursetypecode: this.csubData.coursetypecode,
      coursecode: this.csubData.coursecode,
      subcode: this.csubData.subcode,
      stage: "",
      subtype: "",
      subfee: "",
      isincludedocs: false,
    }
    this.dialogTitle = "Edit Subject Under Course:" + this.csubData.coursename
    this.subjectsList = [];
  }
  ngOnInit() {
    this.loadSubjects();
    setTimeout(() => {
      this.GetCourseSubjectById(this.csubData)
    }, 100);
  }
  GetCourseSubjectById(data: any) {
    let that = this;
    let payLoad = {
      coursetypecode: this.csubData.coursetypecode,
      coursecode: this.csubData.coursecode,
      subcode: this.csubData.subcode
    }

    this._api.post('/courseapi/CourseSub/Get', payLoad).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          let _data = resp.data.list[0];
          that.csubInfo.stage = _data.stage;
          that.csubInfo.subcode = _data.subcode;
          that.csubInfo.subtype = _data.subtype;
          that.csubInfo.subfee = _data.subfee;
          that.csubInfo.isincludedocs = _data.isincludedocs == 1 ? true : false;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onSubmit() {
    let payLoad = {
      coursetypecode: this.csubData.coursetypecode,
      coursecode: this.csubData.coursecode,
      subcode: this.csubInfo.subcode,
      stage: this.csubInfo.stage,
      subtype: this.csubInfo.subtype,
      subfee: this.csubInfo.subfee,
      isincludedocs: this.csubInfo.isincludedocs ? "1" : "0",
    };

    if (this._api.isEmpty(this.csubInfo.subcode)) {
      this._api.errorNotify('Please select subject');
      return;
    }

    if (this._api.isEmpty(this.csubInfo.stage)) {
      this._api.errorNotify('Please select subject stage');
      return;
    }

    if (this._api.isEmpty(this.csubInfo.subtype)) {
      this._api.errorNotify('Please select subject type');
      return;
    }
    if (!this._api.checkPrice(this.csubInfo.subfee, false)) {
      this._api.errorNotify('Please enter valid subject fee');
      return;
    }

    let that = this;
    this._api.post('/courseapi/CourseSub/Update', payLoad).subscribe({
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
