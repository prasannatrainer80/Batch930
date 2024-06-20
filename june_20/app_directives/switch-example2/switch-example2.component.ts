import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-example2',
  templateUrl: './switch-example2.component.html',
  styleUrl: './switch-example2.component.css'
})
export class SwitchExample2Component {
  names : ["Karthik","Meghana","Sai Sampath","Ganesh","Ramanaji"];
  selected : string;
}
