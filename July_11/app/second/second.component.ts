import { Component } from '@angular/core';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [],
  templateUrl: './second.component.html',
  styleUrl: './second.component.css'
})
export class SecondComponent {
  name : string;
  company : string;

  constructor() {
    this.name = "Satish";
    this.company = "Sonix";
  }
}
