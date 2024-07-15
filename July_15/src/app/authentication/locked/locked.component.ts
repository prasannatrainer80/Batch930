import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
})
export class LockedComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  userImg!: string;
  userFullName!: string;
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    // TODO: set image and username
    // this.userImg = this.authService.currentUserValue.img;
    // this.userFullName =
    //   this.authService.currentUserValue.firstName +
    //   ' ' +
    //   this.authService.currentUserValue.lastName;
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
      const roleType = this.authService.currentUserValue.roleType;
      if (roleType === "1") {
        this.router.navigate(['/admin/dashboard/main']);
      } else if (roleType === "2") {
        this.router.navigate(['/teacher/dashboard']);
      } else {
        this.router.navigate(['/authentication/signin']);
      }
    }
  }
}
