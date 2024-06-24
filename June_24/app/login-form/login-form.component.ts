import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  userName : string;
  passWord : string;
  isFormSubmitted : boolean;
  constructor(private _router : Router) {
    this.isFormSubmitted = false;
  }
  login(loginForm : NgForm) {
    if(loginForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    if (this.userName == "Sonix" && this.passWord == "Sonix") {
      // alert("Correct Credentials...");
      this._router.navigate(["menu"]);
    } else {
      alert("Invalid Credentials...");
    }
  }
}
