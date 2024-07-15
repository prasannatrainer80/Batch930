import { Component, OnInit, Input, Inject } from '@angular/core';
import { APICallService, CommonService, MasterService } from '@core';
import { HttpClient } from '@angular/common/http';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit{
  @Input() keyName!:string;
  submitEffect:boolean = false;
  public dialogTitle: string = 'Fileupload';
  public data: any;
  public tempCode: any;
  public datetime: any;
  public interval: any;
  public uploader: FileUploader;
  public fileUpload: boolean = false;
  public filenameupload: string = "";
  public queueLimit: number = 100;
  public maxsizeMB: number = 1;

  uploadURL: string = '';

  constructor(
    private common: CommonService,
    private apiCall: APICallService,
    public dialogRef: MatDialogRef<UploadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.uploadURL = `${environment.uploadUrl}/assetsapi/upload/files`;
  
    this.uploader = new FileUploader({ url: this.uploadURL });
  }

  ngOnInit(): void {
    this.uploader = new FileUploader({
      url: this.uploadURL,
      isHTML5: true,
      maxFileSize: this.maxsizeMB * 1024 * 1024,
      queueLimit: this.queueLimit,
      headers: [
        { name: 'statename', value: 'fileupload' }
      ], 
      allowedMimeType: [
        'image/jpg', 'image/jpeg', 'image/png',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/pdf'
      ]
    });
    this.uploader.onAfterAddingFile = (file: any) => {
      var ext = file?.file?.name.match(/\.(.+)$/)[1];
      if (ext.indexOf('.') !== -1) {
        this.common.errorNotify('Filename with two extensions is not supported');
      }
    };
    this.uploader.onAfterAddingAll = (addedFileItems: any) => {
      let fileSizeInMb = 0;
      // console.log("onAfterAddingAll", this.uploader);
      for (let i = 0; i < this.uploader.queue.length; i++) {
        //  console.log("onAfterAddingAll", this.uploader.queue[i]);
        fileSizeInMb += this.uploader.queue[i].file.size;
        this.tempCode = fileSizeInMb;
      }
      if (this.queueLimit < this.uploader.queue.length) {
        this.fileUpload = false;
        this.common.errorNotify("Max upload file(s) " + this.queueLimit.toString());
      }
      if (fileSizeInMb > (this.maxsizeMB * 1024 * 1024)) {
        this.fileUpload = false;
        this.common.errorNotify('Upload File(s) size should not exceed more than' + '' + this.maxsizeMB + 'MB');
        //this.uploader.clearQueue();
      }
      else {
        this.fileUpload = true;
      }
    };

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.withCredentials = false;
    };
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteAll = () => this.onCompleteAll();
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    try{
      let respData = JSON.parse(response);
      this.data.filecode = respData?.data || '';
      this.data.filename = respData?.data || '';
    }catch{}
  }
  onCompleteAll() {
    let uploadedCount = this.uploader.queue.length;
    if (uploadedCount > 0) {
      if (this.common.isEmpty(this.data?.filecode) || this.data.filecode == "NO_FILES_FOUND") {
        this.common.errorNotify('Please upload atleast one valid file.');
      }
      else {
        var uploadinfo = [{ code: this.data.filecode, length: uploadedCount, filenames: this.uploader.queue }];
        this.dialogRef.close(uploadinfo);
      }
    }
    else {
      this.dialogRef.close();
    }
  }
  onWhenAddingFileFailed(item: any, filter: any, options: any) {
    // console.log("onWhenAddingFileFailed", { item }, { filter })
    this.fileUpload = false;
    let maxFileSize = this.maxsizeMB + " MB"
    let errorMessage = "";
    let itemSize = this.common.formatBytes(item.size, "MB");
    switch (filter.name) {
      case 'fileSize':
        errorMessage = `Maximum upload size exceeded (${itemSize} of ${maxFileSize} allowed)`;
        break;
      case 'mimeType':
        errorMessage = `File type is not allowed.`;
        break;
      case 'queueLimit':
        errorMessage = "Max upload file(s) " + this.queueLimit.toString();
        break;
      default:
        errorMessage = `Unknown error (filter is ${filter.name})`;
    }
    if (errorMessage != "") {
      this.common.errorNotify(errorMessage);
    }
    else {
      this.common.errorNotify("Sorry, We could not process your request");
    }
  }
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = response;
  }

  checkItem() {
    let fileSizeInMb = 0;
    for (let i = 0; i < this.uploader.queue.length; i++) {
      fileSizeInMb += this.uploader.queue[i].file.size;
      this.tempCode = fileSizeInMb;
    }
    if (fileSizeInMb > (this.maxsizeMB * 1024 * 1024)) {
      this.fileUpload = false;
      //this.uploader.clearQueue();
      this.common.errorNotify('Upload File(s) size should not exceed more than' + '' + this.maxsizeMB + 'MB');
    }
    else {
      this.fileUpload = true;
    }
  }
  close() {
    this.dialogRef.close();
  }
  clearQueue() {
    this.data = {
      filecode: ''
    }
  }
  ngOnDestroy() {
  }
  getExtn(fileName: string): string {
    return fileName.lastIndexOf('.') > -1 ? fileName.substring(fileName.lastIndexOf('.')) : "";
  }
}
