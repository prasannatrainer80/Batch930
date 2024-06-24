import { Component } from '@angular/core';
import { Employ } from '../employ';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employ-form',
  templateUrl: './employ-form.component.html',
  styleUrl: './employ-form.component.css'
})
export class EmployFormComponent {

  employ : Employ;
  isValid : boolean;
  msg : string;

  show(employForm : NgForm) {
    if (employForm.invalid) {
      return;
    }
    this.isValid = true;
    this.msg+="Employ No  " +this.employ.empno + 
      " Employ Name  " +this.employ.name + 
      " Department  " +this.employ.dept + 
      " Designation  " +this.employ.desig + 
      " Basic  " +this.employ.basic
  } 
  constructor() {
    this.msg = "";
    this.isValid = false;
    this.employ = new Employ();
  }
}
