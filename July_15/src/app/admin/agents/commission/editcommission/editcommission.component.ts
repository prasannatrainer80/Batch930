import { Component, OnInit, Inject } from '@angular/core';
//import { ApiEndpointsService } from '@config/api-endpoints.service';
//import { APIService } from '@shared';
import { FormGroup, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { APICallService, CommonService } from '@core';
@Component({
  selector: 'app-editcommission',
  templateUrl: './editcommission.component.html',
  styleUrls: ['./editcommission.component.scss']
})
export class EditcommissionComponent implements OnInit {
  efform!: UntypedFormGroup;
  editCommInfo: any = {}
  action: string;
  dialogTitle: string;
  mindate: Date;
  coursetypesList: any[] = [];
  coursesList: any[] = [];
  agentsList: any[] = [];
  editing: boolean = false;
  coursecodes: any[] = [];
  betweendatesedit: Date[];
  public selectedElement: any = {};
  constructor(private _api: APICallService, private common: CommonService,
    public dialogRef: MatDialogRef<EditcommissionComponent>, private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.coursetypesList = [];
    this.coursesList = [];
    this.agentsList = [];
    this.betweendatesedit = [];
    this.mindate = new Date();
    this.action = data.action;
    this.editCommInfo = {
      code: "",
      agentid: "",
      agentname: "",
      courseid: "",
      coursename: "",
      comissionperiod: "",
      comission: "",
      gst: "",
      fromdate: "",
      todate: "",
      status: ""
    }
    this.dialogTitle = "Edit Agent Commission"
  }
  ngOnInit() {
    this.loadCourseTypes();
    this.loadAgents();
    setTimeout(() => {
      this.GetCommissionById(this.data.data)
    }, 100);
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

  GetCommissionById(data: any) {
    let that = this;
    this._api.post('/appapi/AgentCommission/Get', { code: data.code }).subscribe({
      next(resp: any) {
        if (resp.code == '0' && resp.data.list.length > 0) {
     
          let _data = resp.data.list[0];
          let from = that.datePipe.transform(_data.fromdate, "yyyy-MM-dd");
          let to = that.datePipe.transform(_data.todate, "yyyy-MM-dd");

          that.editCommInfo = {
            code: _data.code,
            agentname: _data.agentname,
            coursename: _data.coursename,
            agentid: _data.agentid,
            courseid: _data.courseid,
            comissionperiod: _data.comissionperiod,
            comission: _data.comission,
            gst: _data.gst,
            fromdate: from,
            todate: to,
            status: _data.status
          }
          if (_data.gst?.toLowerCase() == "true")
            that.editCommInfo.gst = "Yes";
          else
            that.editCommInfo.gst = "No";
        }
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }

  onSubmit() {
    this.betweendatesedit = [];
    let fromdate = this.datePipe.transform(this.editCommInfo.fromdate, "yyyy-MM-dd");
    let todate = this.datePipe.transform(this.editCommInfo.todate, "yyyy-MM-dd");

    let payLoad = {
      agentid: this.data?.data?.agentid,
      courseid: this.data?.data?.courseid,
      code: this.data?.data?.code,
      fromdate: fromdate,
      todate: todate
    };
    if (this._api.isEmpty(this.editCommInfo.fromdate)) {
      this._api.errorNotify('Please select from date');
      return;
    }
    if (this._api.isEmpty(this.editCommInfo.todate)) {
      this._api.errorNotify('Please select to date');
      return;
    }
    if (this.editCommInfo.fromdate > this.editCommInfo.todate) {
      this._api.errorNotify('From date should not be greater than to date');
      return;
    }
    var diff = Math.abs(new Date(this.editCommInfo.fromdate).getTime() - new Date(this.editCommInfo.todate).getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    //console.log(diffDays);
    if (diffDays < 60) {
      this._api.errorNotify('Minimum 2 months validity is required');
      return;
    }
    //console.log(this.getDatesEdit(new Date(this.editCommInfo.fromdate), new Date(this.editCommInfo.todate)).length);
    //if (this.getDatesEdit(new Date(this.editCommInfo.fromdate), new Date(this.editCommInfo.todate)).length < 60) {
  
    //  this._api.errorNotify('Minimum 2 months validity is required');
    //  return;
    //}

    let that = this;
    this._api.post('/appapi/AgentCommission/Update', payLoad).subscribe({
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

  getDatesEdit(startDate: Date, endDate: Date): Date[] {
    let currentDate: Date = startDate;
    while (currentDate <= endDate) {
      this.betweendatesedit.push(currentDate);
      currentDate = this.addDaysEdit(currentDate);
    }
    return this.betweendatesedit;
  }

  addDaysEdit(currentDate: Date): Date {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
  }

}
