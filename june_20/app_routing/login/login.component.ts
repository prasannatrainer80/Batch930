import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  userName : string;
  passCode : string;

  constructor(private _router : Router) {

  }
  login() {
    if (this.userName=="Sonix" && this.passCode=="Sonix") {
      this._router.navigate(['menu']);
    } else {
      alert("Invalid Credentials...");
    }
  }
}
