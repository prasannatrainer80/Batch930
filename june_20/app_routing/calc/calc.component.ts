import { Component } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.css'
})
export class CalcComponent {

  firstNo : number;
  secondNo : number;
  result : number;

  sum() {
    this.result = this.firstNo + this.secondNo
  }

  sub() {
    this.result = this.firstNo - this.secondNo
  }

  mult() {
    this.result = this.firstNo * this.secondNo
  }
}
