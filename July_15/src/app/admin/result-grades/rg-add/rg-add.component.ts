import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APICallService, PlatformService } from '@core';
@Component({
  selector: 'app-rg-add',
  templateUrl: './rg-add.component.html',
  styleUrls: ['./rg-add.component.scss']
})
export class RgAddComponent implements OnInit {

  public rgData: any;
  public dialogTitle: string;
  public gradeTypes: any[] = [];
  public outcomeTypes: any[] = [];
  public TcsiReportOptions: any[] = [];
  constructor(
    private _api: APICallService,
    private _platform: PlatformService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RgAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = "Add Result Grade";
    this.rgData = {
      gradetypecode: "",
      isusemarks: false,
      maxmarks: "0",
      isusefinaloutcome: false,
      finaloutcomecode: "",
      description: "",
      transcriptdisplay: "",
      grade: "",
      isexcemption: false,
      usetcsireport:"0"
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
    console.log(this.rgData);
    let payLoad = {
      gradetypecode: this.rgData.gradetypecode,
      isusemarks: this.rgData.isusemarks ? "1" : "0",
      maxmarks: this.rgData.maxmarks,
      isusefinaloutcome: this.rgData.isusefinaloutcome ? "1" : "0",
      finaloutcomecode: this.rgData.finaloutcomecode,
      description: this.rgData.description,
      transcriptdisplay: this.rgData.transcriptdisplay,
      grade: this.rgData.grade,
      isexcemption: this.rgData.isexcemption ? "1" : "0",
      usetcsireport: this.rgData.usetcsireport
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
    this._api.post('/appapi/RGrade/Add', payLoad).subscribe({
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
