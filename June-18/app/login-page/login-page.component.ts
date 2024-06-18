import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    userName : string;
    passWord : string;
    isFormSubmitted : boolean;

    constructor() {
      this.userName = "";
      this.passWord = "";
      this.isFormSubmitted = false;
    }

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
}
