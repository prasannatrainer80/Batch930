import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { APICallService, CommonService, MasterService } from '@core';

@Component({
  selector: 'app-dynamic-status',
  templateUrl: './dynamic-status.component.html',
  styleUrls: ['./dynamic-status.component.scss']
})
export class DynamicStatusComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  dialogTitle: string = "";
  moduleName: string = "";
  itemCode: string = "";
  itemStatus: string = "";
  itemStatusName: string = "";
  submitEffect: boolean = false;
  currentItem: any = {};
  statusList: any[] = [];

  constructor(
    private common: CommonService,
    private apiCall: APICallService,
    public dialogRef: MatDialogRef<DynamicStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();

    this.submitEffect = false;
    this.moduleName = data?.module;
    this.itemCode = data?.code;
    this.dialogTitle = data?.dialogTitle;
    this.itemStatus = data?.status;
    this.statusList = data?.statusList;
  }

  ngOnInit() {
    try {
      this.currentItem = this.statusList.find(x => x.value == this.itemStatus);
      if(this.common.isEmptyObj(this.currentItem)) {
        this.currentItem = this.statusList.find(x => x.key.toUpperCase() == this.itemStatus.toUpperCase());
      }
      this.itemStatusName = this.currentItem?.key;
      // this.statusList.splice(this.statusList.indexOf(this.currentItem), 1);
    } catch (e) { }
  }

  submitForm() {

    if(this.common.isEmpty(this.itemStatus) || this.data?.status == this.itemStatus 
      || this.itemStatus == '-1' || this.currentItem?.value == this.itemStatus){
      this.common.errorNotify('Status change not detected !');
      return;
    }

    const payLoad = {
      module: this.moduleName,
      action: 'statechange',
      code: this.itemCode,
      status: this.itemStatus
    };

    this.submitEffect = true;
    this.apiCall.post(`/dataapi/module/manage`, payLoad).subscribe((itemData: any) => {
      this.submitEffect = false;
      if (itemData?.code == '0') {
        if (itemData?.data?.code == '0') {
          this.common.successNotify(itemData?.data?.message || 'Status updated successfully !');
          this.dialogRef.close({ reload: true });
        }
        else {
          this.common.errorNotify(itemData?.message || 'Sorry, we could not process your request !');
        }
      }
      else {
        this.common.errorNotify(itemData?.message || 'Sorry, error in process your request !');
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ reload: false });
  }
}
