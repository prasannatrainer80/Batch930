import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APICallService, CommonService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
  selector: 'app-tmpl-type-add',
  templateUrl: './tmpl-type-add.component.html',
  styleUrls: ['./tmpl-type-add.component.scss']
})
export class TmplTypeAddComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  dialogTitle: string = "";
  submitEffect: boolean = false;
  tmpltype: string = "";
  tmplname: string = "";
  constructor(
    private common: CommonService,
    private _api: APICallService,
    public dialogRef: MatDialogRef<TmplTypeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.dialogTitle = data?.dialogTitle;
  }
  ngOnInit() {
  }

  onSubmit() {
    let that = this;
    this.submitEffect = true;
    if (this.common.isEmpty(this.tmpltype)) {
      this.common.errorNotify('Please enter template type');
      return;
    }
    if (this.common.isEmpty(this.tmplname)) {
      this.common.errorNotify('Please enter template name');
      return;
    }
    let payLoad = {
      tmpltype: this.tmpltype.toUpperCase(),
      name: this.tmplname
    };
    this.submitEffect = true;
    this._api.post('/appapi/emailtmpl/addtype', payLoad).subscribe({
      next(resp: any) {
        this.submitEffect = false;
        if (resp.code == '0') {
          that._api.successNotify(resp.message);
          setTimeout(() => {
            that.dialogRef.close({ reload: true });
          }, 1000);
        }
        else {
          that._api.errorNotify(resp?.message);
          setTimeout(() => {
            that.dialogRef.close({ reload: false });
          }, 1000);
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify(msg)
      },
    });

  }
}
