import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { APICallService } from '@core';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {
  public reqForm: any;
  public hide = true;
  public hide1 = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _api: APICallService
  ) { }
  ngOnInit() {
    let forgetcode = this.route.snapshot.params['code']
    this.reqForm = {
      forgotcode:forgetcode,
      encryptkey: "",
      confirmkey: ""
    }
  }
  onSubmit(): void {
    if (this.reqForm.encryptkey == "") {
      this._api.errorNotify("Please enter New Password");
      return;
    }
    if (this.reqForm.confirmkey == "") {
      this._api.errorNotify("Please enter Confirm Password");
      return;
    }
    if (this.reqForm.confirmkey != this.reqForm.encryptkey) {
      this._api.errorNotify("New Password and Confirm Password are not same");
      return;
    }

    let payload: any = { forgotcode: this.reqForm.forgotcode, encryptkey: btoa(this.reqForm.encryptkey), confirmkey: btoa(this.reqForm.confirmkey) };
    let that = this;
    this._api.post('/loginapi/auth/resetpassword', payload).subscribe({
      next(resp: any) {
        if (resp.code == '0') {
          that._api.successNotify(resp.message)
          that.router.navigate(['/authentication/signin']);
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
