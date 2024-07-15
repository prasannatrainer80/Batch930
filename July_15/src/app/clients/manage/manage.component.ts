import { Component, OnInit, Inject } from '@angular/core';
import { APICallService } from '@core';
import { UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  clientform!: UntypedFormGroup;
  clientInfo: any = {}
  action: string;
  dialogTitle: string;

  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<ManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.action = data.action;
    this.clientInfo = {
      clientid: 0,
      code: "",
      name: "",
      domainName: "",
      contacts:{
        emailid:""
      }
    }
    this.dialogTitle = this.action === 'edit' ? 'Edit Client' : "Add Client"
  }
  ngOnInit() {
    if (this.action === 'edit') {
      let uData = this.data.data;
      this.clientInfo = {
        clientid: uData.clientid,
        code: uData.code,
        name: uData.name,
        domainName: uData.domainName,
        contacts:{
          emailid:uData.emailid
        }
      }
    }
    else {
    }
  } 
  onSubmit() {
    let that = this;
    if (this._api.isEmpty(this.clientInfo.code)) {
      this._api.errorNotify('Please enter client code');
      return;
    }
    if (this._api.isEmpty(this.clientInfo.name)) {
      this._api.errorNotify('Please enter client name');
      return;
    }
    if (this._api.isEmpty(this.clientInfo.domainName)) {
      this._api.errorNotify('Please enter client name');
      return;
    }
    if (this._api.isEmpty(this.clientInfo.contacts.emailid)) {
      this._api.errorNotify('Please enter client emailid');
      return;
    }
    let payLoad = {
      clientid: this.clientInfo.clientid,
      code: this.clientInfo.code,
      name: this.clientInfo.name,
      domainName: this.clientInfo.domainName,
      contacts:{
        emailid:this.clientInfo.contacts.emailid
      }
    };
    if (this.action === 'add') {
      this._api.post('/appapi/client/Invite', payLoad).subscribe({
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
    else {
      this._api.post('/appapi/client/update', payLoad).subscribe({
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
  };
  onCancel() {
    this.dialogRef.close(false);
  }

}
