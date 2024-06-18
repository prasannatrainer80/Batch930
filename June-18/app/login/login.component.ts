import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userName : string;
  passWord : string;
  isFormSubmitted : boolean;

  login(loginForm : NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.isFormSubmitted = true;
    if (this.userName=="Sonix" && this.passWord == "Sonix") {
      alert("Correct Credentials...");
    } else {
      alert("Invalid Credentials...");
    }
  }
  constructor() {
    this.userName = "";
    this.passWord = "";
    this.isFormSubmitted = false;
  }
}
