import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core'; 
import { APICallService } from '@core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  breadscrums = [
    {
      title: 'Profile',
      items: [],
      active: 'Profile',
    },
  ];
  submitEffect: boolean = false;
  public userInfo: any;
  public hide = true;
  public hide1 = true;
  public hide2 = true;
  public pwdInfo: any = {};
  constructor(private authService: AuthService, private _api: APICallService,private location: Location) {
    let userInfo = this.authService.currentUserValue;
    if (userInfo != undefined && userInfo != null) {
      this.userInfo = userInfo;
    }
    else {

    }
    this.pwdInfo = {
      oldpassword: "",
      newpassword: "",
      confirmpassword: ""
    }
  }
  ngOnInit() {
  }
  onCancel() {
    this.pwdInfo = {
      oldpassword: "",
      newpassword: "",
      confirmpassword: ""
    }
  }
  onChangePassword() {
    let that = this;
    if (this._api.isEmpty(this.pwdInfo.oldpassword)) {
      this._api.errorNotify('Please enter old password');
      return;
    }
    if (this._api.isEmpty(this.pwdInfo.newpassword)) {
      this._api.errorNotify('Please enter new password');
      return;
    }
    if (this._api.isEmpty(this.pwdInfo.confirmpassword)) {
      this._api.errorNotify('Please enter confirm password');
      return;
    }
    if (this.pwdInfo.newpassword != this.pwdInfo.confirmpassword) {
      this._api.errorNotify('Your password and confirmation password do not match.');
      return;
    }
    this.submitEffect = true;
    let reqInfo = {
      oldpwdkey: btoa(this.pwdInfo.oldpassword),
      encryptkey: btoa(this.pwdInfo.newpassword),
      confirmkey: btoa(this.pwdInfo.confirmpassword)
    }
    this._api.post('/appapi/user/changepassword', reqInfo).subscribe({
      next(resp: any) {
        that.submitEffect = false;
        if (resp.code == '0') {
          that._api.successNotify(resp.message)
        }
        else {
          that._api.errorNotify(resp?.message);
        }
      },
      error(msg: any) {
        this.submitEffect = false;
        that._api.errorNotify(msg)
      },
    });
  }
  showCustomHtml() {
    Swal.fire({
      title: '<strong>Password Policies</strong>',
      icon: 'info',
      html:'<p>Min Length: 8<br/>Max Length: 16<br/>One lower case letter<br />One upper case letter<br/>One numeric value<br/>One special character @$^&+=</p>',
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
    });
  }
}
