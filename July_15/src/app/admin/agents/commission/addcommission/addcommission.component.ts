import { Component, OnInit, Inject, ViewChild } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
//import { APIService } from '@shared';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-addcommission',
  templateUrl: './addcommission.component.html',
  styleUrls: ['./addcommission.component.scss']
})
export class AddcommissionComponent implements OnInit {
  efform!: UntypedFormGroup;
  addCommInfo: any = {}
  action: string;
  dialogTitle: string;

  coursetypesList: any[] = [];
  coursesList: any[] = [];
  agentsList: any[] = [];

  coursecodes: any[] = [];
  mindate: Date;
  public selectedElement: any = {};
  @ViewChild('select') select: MatSelect | undefined;
  allSelected = false;
  constructor(private _api: APICallService,
    public dialogRef: MatDialogRef<AddcommissionComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any, private common: CommonService) {
    this.coursetypesList = [];
    this.coursesList = [];
    this.agentsList = [];
    this.mindate = new Date();
    this.action = data.action;
    this.addCommInfo = {
      agentid: "",
      coursecodes: "",
      comissionperiod: "",
      comission: "",
      gst: "",
      fromdate: "",
      todate: ""
    }
    this.dialogTitle = "Add Agent Commission"
  }
  ngOnInit() {
    this.loadCourseTypes();
    this.loadAgents();

  }

  loadAgents() {
    let that = this;
    this._api.post('/appapi/AgentCommission/GetAgents', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.agentsList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  loadCourseTypes() {
    let that = this;
    this._api.post('/appapi/coursetype/list', {}).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
   
          const index = resp.data.list.findIndex((item: any) => item.code.toUpperCase() === "ELICOS");
          if (index > -1)
            resp.data.list.splice(index, 1);
          that.coursetypesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onChangeCourseType(ctype: any) {
    this.loadCoursesByCTypes(ctype);
  }
  loadCoursesByCTypes(ctype: string) {
    let that = this;
    this._api.post('/courseapi/manage/listbycoursetype', { ctypecode: ctype }).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that.coursesList = resp.data.list;
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onSubmit() {

    let fromdate = this.datePipe.transform(this.addCommInfo.fromdate, "yyyy-MM-dd");
    let todate = this.datePipe.transform(this.addCommInfo.todate, "yyyy-MM-dd");

    let payLoad = {
      agentid: this.addCommInfo.agentid,
      coursecodes: this.coursecodes.join(','),
      comissionperiod: this.addCommInfo.comissionperiod,
      comission: this.addCommInfo.comission,
      gst: this.addCommInfo.gst,
      fromdate: fromdate,
      todate: todate
    };


    if (this._api.isEmpty(this.addCommInfo.agentid)) {
      this._api.errorNotify('Please select agent');
      return;
    }
    if (this._api.isEmpty(payLoad.coursecodes)) {
      this._api.errorNotify('Please select courses');
      return;
    }
    if (this._api.isEmpty(payLoad.comissionperiod)) {
      this._api.errorNotify('Please select commission period');
      return;
    }
    if (this._api.isEmpty(this.addCommInfo.comission)) {
      this._api.errorNotify('Please enter commission');
      return;
    }
    var comper = parseFloat(this.addCommInfo.comission);
    if (isNaN(comper) || comper < 0 || comper > 100) {
      this._api.errorNotify('Please enter valid commission');
      return;
    }
    if (this._api.isEmpty(this.addCommInfo.gst)) {
      this._api.errorNotify('Please select GST');
      return;
    }
    if (this._api.isEmpty(this.addCommInfo.fromdate)) {
      this._api.errorNotify('Please select from date');
      return;
    }
    if (this._api.isEmpty(this.addCommInfo.todate)) {
      this._api.errorNotify('Please select to date');
      return;
    }
    if (this.addCommInfo.fromdate > this.addCommInfo.todate) {
      this._api.errorNotify('From date should not be greater than to date');
      return;
    }
    var diff = Math.abs(new Date(this.addCommInfo.fromdate).getTime() - new Date(this.addCommInfo.todate).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 60) {
  
      this._api.errorNotify('Minimum 2 months validity is required');
      return;
    }

    let that = this;
    this._api.post('/appapi/AgentCommission/Add', payLoad).subscribe({
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

  toggleAllSelection() {
    if (this.allSelected) {
      this.select?.options.forEach((item: MatOption) => item.select());
    } else {
      this.select?.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionClick() {
    let newStatus = true;
    this.select?.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }

}
