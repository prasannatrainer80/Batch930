import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-std-course-time-table-details',
  templateUrl: './std-course-time-table-details.component.html',
  styleUrls: ['./std-course-time-table-details.component.scss']
})
export class StdCourseTimeTableDetailsComponent {
  stdDetails: any = {};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  ngOnInit(): void {
    if (this.dialogData) {
      this.stdDetails = this.dialogData;
    }
  }
}
