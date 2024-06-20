import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-example1',
  templateUrl: './switch-example1.component.html',
  styleUrl: './switch-example1.component.css'
})
export class SwitchExample1Component {
  choice : number;
  constructor() {
    this.choice =1;
  }
}
