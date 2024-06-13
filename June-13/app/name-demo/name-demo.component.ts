import { Component } from '@angular/core';

@Component({
  selector: 'app-name-demo',
  templateUrl: './name-demo.component.html',
  styleUrl: './name-demo.component.css'
})
export class NameDemoComponent {

    firstName : string;
    lastName : string;
    fullName : string;

    show() {
      this.fullName = this.firstName + " " +this.lastName;
    }
}
