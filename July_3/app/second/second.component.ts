import { Component } from '@angular/core';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  
  result1 : string;
  result2 : string;
  result3 : string;
  constructor(private _demoService : DemoService) {
    this.result1 = this._demoService.sayHello();
    this.result2 = this._demoService.company();
    this.result3 = this._demoService.trainer();
  }
}
