import { Component } from '@angular/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css'
})
export class CalculationComponent {

  firstNo : number;
  secondNo : number;
  result : number;

  sum() {
    this.result = this.firstNo + this.secondNo;
  }

  sub() {
    this.result = this.firstNo - this.secondNo;
  }

  mult() {
    this.result = this.firstNo * this.secondNo;
  }
  
}
