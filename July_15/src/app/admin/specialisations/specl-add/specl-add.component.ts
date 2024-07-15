
import { Component, Inject } from '@angular/core';
import { APICallService,CommonService } from '@core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-specl-add',
  templateUrl: './specl-add.component.html',
  styleUrls: ['./specl-add.component.scss']
})
export class SpeclAddComponent {
  csubform!: UntypedFormGroup;
  action: string;
  dialogTitle: string;
  name: string = "";
  remarks: string = "";
  coursecode: string = "";
  coursename: string = "";
  constructor(private _api: APICallService, private _common: CommonService,
    public dialogRef: MatDialogRef<SpeclAddComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    this.coursecode = data.coursecode;
    this.coursename = data.coursename;

    this.dialogTitle = "Add Specialisations Under Course:" + this.coursename
  }
  ngOnInit() {
  }
  onSubmit() {
    let payLoad = {
      coursecode: this.coursecode,
      name: this.name,
      remarks: this.remarks
    };

    if (this._common.isEmpty(this.name)) {
      this._common.errorNotify('Please enter specialisation name');
      return;
    }

    let that = this;
    this._api.post('/courseapi/Specialisations/Add', payLoad).subscribe({
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
