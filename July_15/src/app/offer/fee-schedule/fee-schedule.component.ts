import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
@Component({
  selector: 'app-fee-schedule',
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.scss']
})
export class FeeScheduleComponent {
  inputCount: number = 1;
  formGroup: FormGroup;
  values: string[] = [];
  stdData: any
  inputs: FormArray;
  courseTable: any = []
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) dialogData: any) {
    console.log("Dialog Data: ", dialogData)
    this.stdData = dialogData.data
    this.courseTable = dialogData.courseTable

    this.formGroup = this.fb.group({
      inputs: this.fb.array([])
    });
    this.inputs = this.formGroup.get('inputs') as FormArray;
  }

  // get inputs(): FormArray {
  //   return this.formGroup.get('inputs') as FormArray;
  // }
 
  pageSize = 4;
  pageIndex = 0;
  roundedInstallmentAmt: any
  frequency = 7; // in days
  todayDate = new Date('2024-07-12');
  // currentDate = new Date('12-07-2024');
  generate() {
    const inputs = this.inputs;

    while (inputs.length !== this.inputCount) {
      if (inputs.length < this.inputCount) {
        inputs.push(this.fb.group({
          dueDate: ['', Validators.required],
          installmentAmount: [this.roundedInstallmentAmt, Validators.required]
        }));
      } else {
        inputs.removeAt(inputs.length - 1);
      }
    }

    this.populateDueDates();
  }

  populateDueDates() {
    let currentDate = new Date(this.todayDate);
    for (let i = 0; i < this.inputCount; i++) {
      const control = this.inputs.at(i);
      const dueDate = new Date(currentDate);
      control.get('dueDate').setValue(this.formatDate(dueDate)); // Format date as MM/DD/YYYY
      currentDate.setDate(currentDate.getDate() + this.frequency);
    }
  }

  formatDate(date: Date): string {
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
  }
 
  handlePageEvent(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  onSubmit() {
    if (this.formGroup.valid) {
      this.values = (this.formGroup.get('inputs') as FormArray).value;
      console.log("Installments: ", this.values);
    }
  }


  // DatePicker Code Starts

  // DatePicker Code Ends
}

