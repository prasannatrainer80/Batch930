import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-condition1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './condition1.component.html',
  styleUrl: './condition1.component.css'
})
export class Condition1Component {
  status : boolean;
  constructor() {
    this.status = true;
  }
}
