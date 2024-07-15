import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-std-attandance-details',
  templateUrl: './std-attandance-details.component.html',
  styleUrls: ['./std-attandance-details.component.scss'],
})
export class StdAttandanceDetailsComponent {
  stdDetails: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  ngOnInit(): void {
    if (this.dialogData) {
      this.stdDetails = this.dialogData;
    }
  }
}
