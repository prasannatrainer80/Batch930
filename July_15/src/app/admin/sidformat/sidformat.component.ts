import { Component, OnInit, AfterViewInit } from '@angular/core';
import { APICallService, CommonService } from '@core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-sidformat',
  templateUrl: './sidformat.component.html',
  styleUrls: ['./sidformat.component.scss']
})
export class SIDFormatComponent
  implements OnInit, AfterViewInit {
  public breadscrums: any = [
    {
      title: '',
      items: [],
      active: 'Setup Student ID Format',
    },
  ];
  public sidFields: any[] = [];
  public sid: string = "";
  public showHelpText: boolean = false;
  pageTitle: string = "";
  helpText: string = "";
  constructor(
    private _router: Router,
    private _api: APICallService,
    private _common: CommonService,
  ) {
    this.sidFields = [
      {
        "id": "1",
        "type": "CC",
        "code": "CC",
        "name": "Country Code",
        "order": "0",
        "value": "",
        "description": "AUS is a sample value.It will get country code according to student country of birth",
        "digit": "",
        "status": false,
        "maxlength":'4'
      },
      {
        "id": "2",
        "type": "ALN",
        "code": "ALN",
        "name": "Alphanumeric",
        "order": "0",
        "value": "ID",
        "description": "Max 5 Characters, Text in Student ID",
        "digit": "",
        "status": false,
        "maxlength":'5'
      },
      {
        "id": "3",
        "type": "YR",
        "code": "YR",
        "name": "Year Digit",
        "order": "0",
        "value": "",
        "description": "Current year digit characters, 2:for last two year digits, 4:for full year digits ",
        "digit": "2",
        "status": false,
        "maxlength":'4'
      },
      {
        "id": "4",
        "type": "AN",
        "code": "SN",
        "name": "Number",
        "order": "4",
        "value": "0001",
        "description": "Max 6 digits position. This value will be the number of random digits. Where D is the random number.",
        "digit": "2",
        "status": false,
        "maxlength":'6'
      }
    ];
  }
  ngOnInit() {
    this.getSIDFormat();
    this.helpText = "<p>The options below are used to setup or modify the format of the Student ID.</p> <p>The ideal student ID format is 10 characters. Having a student ID format longer than 10 characters can affect the AVETMISS, TCSI and eCAF reporting.</p>"
  }
  ngAfterViewInit() {
  }
  getSIDFormat() {
    let that = this;
    this._api.post('/appapi/SIDFormat/get', {}).subscribe({
      next(resp: any) {
        let _data = resp.data.list;
        _data.forEach((_itm: any) => {
          _itm.status = (_itm.status == '1' ? true : false)
        });
        that.sidFields = _data;
        that.generateSID();
      },
      error(msg: any) {
        console.log(msg);
      },
    });
  }
  onSetup() {

    // check order duplicate
    const uvArr = this.sidFields.filter(a => a.status == true).map(v => v.order);
    if (uvArr.length == 0) {
      this._common.errorNotify('Please enable atleast on  format type');
      return;
    }

    const uniqueValues = new Set(uvArr)
    if (uniqueValues.size < uvArr.length) {
      this._common.errorNotify('Order should not be same');
      return;
    }

    this.sidFields.forEach(_itm => {
      _itm.status = (_itm.status ? '1' : '0')
      if (_itm.id == '4' && _itm.type == 'RN') {
        _itm.value = Math.random().toString(36).substr(2, 8).toUpperCase();
      }
    });

    // console.log(this.sidFields);

    let that = this;
    this._api.post('/appapi/SIDFormat/Set', this.sidFields).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that._api.successNotify(resp.message);
          that.getSIDFormat();
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
  generateSID() {
    const uvArr = this.sidFields.filter(a => a.status == true).sort(function (a, b) { return Number(a.order) - Number(b.order) });
    let sidformat = '';
    uvArr.forEach(_itm => {
      // if (_itm.id == '4' && _itm.type == 'RN') {
      //   _itm.value = Math.random().toString(36).substr(2, 8).toUpperCase();
      // }
      if (_itm.code == 'YR') {
        const d = new Date();
        if (_itm.value == '2') {
          sidformat += d.getFullYear().toString().substr(-2)
        }
        if (_itm.value == '4') {
          sidformat += d.getFullYear().toString() + ''
        }
      }
      else {
        sidformat += _itm.value + '';
      }
    });
    this.sid = sidformat;
  }
  onPreviewClick() {
    this.generateSID();
  }
  onClear() {
    this.redirectTo('');
  }
  redirectTo(uri: string) {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate([uri]));
  }
}
