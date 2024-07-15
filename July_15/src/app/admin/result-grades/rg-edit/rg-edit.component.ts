import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APICallService, PlatformService } from '@core';
@Component({
  selector: 'app-rg-edit',
  templateUrl: './rg-edit.component.html',
  styleUrls: ['./rg-edit.component.scss']
})
export class RgEditComponent implements OnInit {

  public rgData: any;
  public dialogTitle: string;
  public gradeTypes: any[] = [];
  public outcomeTypes: any[] = [];
  public TcsiReportOptions: any[] = [];
  constructor(
    private _api: APICallService,
    private _platform: PlatformService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RgEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let grData = this.data.data;
    this.dialogTitle = "Edit Result Grade";
    this.rgData = {
      code: grData.code,
      gradetypecode: grData.gradetypecode,
      isusemarks: grData.isusemarks == '1' ? true : false,
      maxmarks: grData.maxmarks,
      isusefinaloutcome: grData.isusefinaloutcome == '1' ? true : false,
      finaloutcomecode: grData.finaloutcomecode,
      description: grData.description,
      transcriptdisplay: grData.transcriptdisplay,
      grade: grData.grade,
      isexcemption: grData.isexcemption == '1' ? true : false,
      usetcsireport: grData.usetcsireport
    }
  }
  ngOnInit() {
    this.loadGardingTypes();
    this.loadOutcomeTypes();
    this.loadTcsiReportOptions();
  }
  loadGardingTypes() {
    let that = this;
    this._api.post('/appapi/Masters/GetResultGradeTypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.gradeTypes = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  loadOutcomeTypes() {
    let that = this;
    this._api.post('/appapi/RGrade/GetOutcomeTypes', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
          that.outcomeTypes = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  async loadTcsiReportOptions() {
    let that = this;
    this._platform.getTcsiReportOptions().then((resp: any) => {
      that.TcsiReportOptions = resp;
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  onSaveClick() {
    let payLoad = {
      code: this.rgData.code,
      gradetypecode: this.rgData.gradetypecode,
      isusemarks: this.rgData.isusemarks ? "1" : "0",
      maxmarks: this.rgData.maxmarks,
      isusefinaloutcome: this.rgData.isusefinaloutcome ? "1" : "0",
      finaloutcomecode: this.rgData.finaloutcomecode,
      description: this.rgData.description,
      transcriptdisplay: this.rgData.transcriptdisplay,
      grade: this.rgData.grade,
      isexcemption: this.rgData.isexcemption ? "1" : "0",
      usetcsireport:this.rgData.usetcsireport
    };

    if (this._api.isEmpty(this.rgData.gradetypecode)) {
      this._api.errorNotify('Please select grading type');
      return;
    }
    if (!this._api.checkPrice(this.rgData.finaloutcomecode, true)) {
      this._api.errorNotify('Please select final outcome code');
      return;
    }
    if (this.rgData.isusemarks) {
      if (!this._api.isNumber(this.rgData.maxmarks)) {
        this._api.errorNotify('Please enter max marks');
        return;
      }
    }
    if (this._api.isEmpty(payLoad.transcriptdisplay)) {
      this._api.errorNotify('Please enter transcript display');
      return;
    }
    if (this._api.isEmpty(payLoad.grade)) {
      this._api.errorNotify('Please enter grade');
      return;
    }
    if (this._api.isEmpty(payLoad.usetcsireport) || payLoad.usetcsireport =="0") {
      this._api.errorNotify('Please select use TCSI Report');
      return;
    }
    let that = this;
    this._api.post('/appapi/RGrade/Update', payLoad).subscribe({
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
}
