import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APICallService, AuthService } from '@core';
import { UploadFileDialogComponent } from '@shared/components/upload-file-dialog/upload-file-dialog.component';
import AOS from "aos";


@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  providers: [],
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements OnInit {
  fileName: any;
  appRefId: any
  appStatus: any

  apiService = inject(APICallService);
  authService = inject(AuthService);


  private _formBuilder = inject(FormBuilder)
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router

  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
console.log(params)
      this.appRefId = params['appRefId']
      const appStatusString = params['appstatus']
      if (appStatusString !== null) {
        // Guaranteed non-null string, safe to convert
        this.appStatus = parseFloat(appStatusString);
        this.appStatus = this.appStatus + 1
      }
    })

  }





  ngOnInit(): void {
    AOS.init({
      duration: 4000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });


  }


  selectedFileName: any

  dialog = inject(MatDialog)


  openFileInput(){
    this.dialog.open(UploadFileDialogComponent);
  }
  gotostep5() {
    this._router.navigate(['/public/step5'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })

  }
  gotostep7() {
    this._router.navigate(['/public/step7'], { queryParams: { appRefId: this.appRefId, appstatus: this.appStatus } })

  }

}
