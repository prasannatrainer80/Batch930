import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-std-fee-details',
  templateUrl: './std-fee-details.component.html',
  styleUrls: ['./std-fee-details.component.scss']
})
export class StdFeeDetailsComponent {
  stdDetails: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  ngOnInit(): void {
    if (this.dialogData) {
      this.stdDetails = this.dialogData;
    }
  }
}
