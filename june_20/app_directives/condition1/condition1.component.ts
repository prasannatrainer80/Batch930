import { Component } from '@angular/core';

@Component({
  selector: 'app-condition1',
  templateUrl: './condition1.component.html',
  styleUrl: './condition1.component.css'
})
export class Condition1Component {

  no : number;
  constructor() {
    this.no = 15;
  }
}
