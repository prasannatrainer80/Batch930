import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APICallService } from '@core';

@Component({
  selector: 'app-std-course-details',
  templateUrl: './std-course-details.component.html',
  styleUrls: ['./std-course-details.component.scss'],
})
export class StdCourseDetailsComponent {
  stdDetails: any = {};
  coursesList: any = [];

  apiService = inject(APICallService);

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  ngOnInit(): void {
    if (this.dialogData) {
      this.stdDetails = this.dialogData;
      this.GetStudentsCoursesById(this.stdDetails.data.id);
    }
  }

//https://api.eduwebcamp.com/studentapi/Student/StudentsAssignmentsById

  async GetStudentsCoursesById(key: any) {
    const url = '/studentapi/Student/StudentsAssignmentsById';
    const payload = {
      stuId: key,
    };

    this.apiService.post(url, payload).subscribe({
      next: (res: any) => {
        this.coursesList = res.data.coursesList;
        console.log(this.coursesList)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
