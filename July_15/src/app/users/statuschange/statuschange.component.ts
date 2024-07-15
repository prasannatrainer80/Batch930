import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { APICallService, CommonService, MasterService } from '@core';

@Component({
  selector: 'app-statuschange',
  templateUrl: './statuschange.component.html',
  styleUrls: ['./statuschange.component.scss']
})
export class StatusChangeComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  dialogTitle: string = "";
  name: string = "";
  roleName: string = "";
  emailId: string = "";
  itemStatus: string = "";
  itemStatusName: string = "";
  

  submitEffect: boolean = false;
  currentItem: any = {};
  statusList: any[] = [];

  constructor(
    private common: CommonService,
    private apiCall: APICallService,
    public dialogRef: MatDialogRef<StatusChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();

    this.submitEffect = false;
    this.emailId = data?.emailid;
    this.dialogTitle = data?.dialogTitle;
    this.itemStatus = data?.status;
    this.statusList = data?.statusList;
    this.name = data?.name;
    this.itemStatusName = data?.itemStatusName;
    this.roleName = data?.rolename;
  }

  ngOnInit() {
    // try {
    //   this.currentItem = this.statusList.find(x => x.value == this.itemStatus);
    //   if (this.common.isEmptyObj(this.currentItem)) {
    //     this.currentItem = this.statusList.find(x => x.key.toUpperCase() == this.itemStatus.toUpperCase());
    //   }
    //   this.itemStatusName = this.currentItem?.key;
    //   // this.statusList.splice(this.statusList.indexOf(this.currentItem), 1);
    // } catch (e) { }
  }

  submitForm() {
    if (this.common.isEmpty(this.itemStatus) || this.data?.status == this.itemStatus
      || this.itemStatus == '-1' || this.currentItem?.value == this.itemStatus) {
      this.common.errorNotify('Status change not detected !');
      // return;
    }

    this.submitEffect = true;
    let that = this;

    const apiURL = this.itemStatus == '1' ? '/appapi/user/activate' : '/appapi/user/changestatus';

    const payLoad = { emailid: this.data?.emailid, type: this.itemStatus };
    return this.apiCall.post(apiURL, payLoad).subscribe({
      next(resp: any) {
        if (resp != null && resp.code == '0') {
          if (this.itemStatus == '1') {
            that.apiCall.successNotify('User Activated Successfully!')
          }
          else {
            that.apiCall.successNotify(resp.message);
          }
          this.dialogRef.close({ reload: true });
        } else {
          that.apiCall.errorNotify(resp?.message)
          this.dialogRef.close({ reload: false });
        }
      },
      error(msg: any) {
        that.apiCall.errorNotify('Something went wrong!')
        this.dialogRef.close({ reload: false });
      },
    });

  }

  closeDialog(): void {
    this.dialogRef.close({ reload: false });
  }
}
