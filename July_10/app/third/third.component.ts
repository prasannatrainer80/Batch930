import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './third.component.html',
  styleUrl: './third.component.css'
})
export class ThirdComponent {
  name : string;
  city : string;
  constructor() {
    this.name = "Raj";
    this.city = "Hyderabad";
  }
}
