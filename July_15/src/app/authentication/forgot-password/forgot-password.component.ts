import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { APICallService } from '@core'; 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _api: APICallService 
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      console.log(this.authForm.value)
      let that = this;
      this._api.post('/loginapi/auth/ForgetPassword', this.authForm.value).subscribe({
        next(resp: any) {
          if (resp.code == '0') {
            that._api.successNotify(resp.message)
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
      // this.router.navigate(['/dashboard/main']);
    }
  }
}
