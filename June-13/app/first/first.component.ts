import { Component } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrl: './first.component.css'
})
export class FirstComponent {
  sname : string;
  city : string;
  course : string;

  constructor() {
    this.sname = "Ganesh";
    this.city="Vizag";
    this.course = "Java FullStack";
  }
}
