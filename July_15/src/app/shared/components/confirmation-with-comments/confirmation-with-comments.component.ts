 
import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIService } from '@shared';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-confirmation-with-comments',
  templateUrl: './confirmation-with-comments.component.html',
  styleUrls: ['./confirmation-with-comments.component.scss']
})
export class ConfirmationWithCommentsComponent {
  public addCusForm!: UntypedFormGroup;
  public comments: string = "";
  public message: string = "";
  constructor(private fb: UntypedFormBuilder, public dialogRef: MatDialogRef<ConfirmationWithCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _api: APIService) { }
  public ngOnInit(): void {
    this.message = this.data.message;
    this.addCusForm = this.fb.group({
      comments: [
        this.comments,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ]
    });
  }
  closeDialog(): void {
    let _resp = {
      status: false,
      comment: ""
    }
    this.dialogRef.close(_resp);
  }
  onSubmitClick() {
    let comments = this.addCusForm.value.comments;
    if (this._api.isEmpty(comments)) {
      this._api.errorNotify('Please enter your comments');
      return;
    }
    let _resp = {
      status: true,
      comments: comments
    }
    this.dialogRef.close(_resp);
  }
}
