import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrl: './third.component.css'
})
export class ThirdComponent {

    name : string;
    city : string;

    constructor(private _activatedRoute : ActivatedRoute) {
      this.name = this._activatedRoute.snapshot.params["name"];
      this.city = this._activatedRoute.snapshot.params["city"];
    }
}
