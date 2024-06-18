import { Component } from '@angular/core';
import { Employ } from '../employ';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employ-form',
  templateUrl: './employ-form.component.html',
  styleUrl: './employ-form.component.css'
})
export class EmployFormComponent {

  employ : Employ;
  isValid : boolean;
  msg :string;
  constructor() {
    this.employ = new Employ();
    this.isValid = false;
  }

  show(employForm : NgForm) {
    if (employForm.invalid) {
      return;
    }
    this.isValid = true;
    this.msg+="Employ No  " +this.employ.empno + "\n" +
        " Employ Name  " +this.employ.name +  "\n" +
        " Department  " +this.employ.dept + "\n" +
        " Designation  " +this.employ.desig +  "\n" +
        " Basic  " +this.employ.basic
  }

}
