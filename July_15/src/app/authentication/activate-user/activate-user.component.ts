import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { APICallService } from '@core';
@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
}) 
export class ActivateUserComponent implements OnInit {
  public reqForm: any;
  public hide = true;
  public hide1 = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _api: APICallService 
  ) { }
  ngOnInit() {
    let invitecode = this.route.snapshot.params['code']
    this.reqForm = {
      invitecode:invitecode,
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

    let payload: any = { invitecode: this.reqForm.invitecode, encryptkey: btoa(this.reqForm.encryptkey), confirmkey: btoa(this.reqForm.confirmkey) };
    let that = this;
    this._api.post('/loginapi/auth/validateactivate', payload).subscribe({
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
