import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
import { ShimmerComponent } from './shimmer/shimmer.component';
import { SharedModule } from '../shared.module';
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  declarations: [FileUploadComponent, UploadFileDialogComponent, BreadcrumbComponent, PaginationComponent, ShimmerComponent],
  imports: [FormsModule, ReactiveFormsModule, FileUploadModule, SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, PaginationComponent, ShimmerComponent],
})
export class ComponentsModule { }
