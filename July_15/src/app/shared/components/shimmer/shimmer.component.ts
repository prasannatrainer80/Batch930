import { Component, Input } from '@angular/core';

@Component({
  selector: 'shimmer',
  templateUrl: './shimmer.component.html',
  styleUrls: ['./shimmer.component.scss'],
})
export class ShimmerComponent {
  @Input()
  width!: number;
  @Input()
  height!: number;

  constructor() {
    //constructor
  }
}
