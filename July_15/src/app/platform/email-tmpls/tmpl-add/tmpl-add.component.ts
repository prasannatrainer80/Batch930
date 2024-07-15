import { Component, OnDestroy, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, APICallService, CommonService } from '@core';
import { MatDialog } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { Router } from '@angular/router';
import { TmplTypeAddComponent } from '../tmpl-type-add/tmpl-type-add.component'
@Component({
  selector: 'app-tmpl-add',
  templateUrl: './tmpl-add.component.html',
  styleUrls: ['./tmpl-add.component.scss']
})
export class TmplAddComponent extends UnsubscribeOnDestroyAdapter implements OnInit, OnDestroy {

  userInfo: any = {};
  tmplTypesList: any[] = [];
  dialogTitle: string;
  breadscrums: any[] = [
    {
      title: 'Add',
      items: [
        {
          title: 'Email Template',
          url: '/platform/emailtmpls/list',
        },
      ],
      active: 'Add',
    },
  ];
  tmplInfo: any = {}
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  editor: any;
  submitEffect: boolean = false;
  constructor(
    private authService: AuthService,
    private _api: APICallService,
    public dialog: MatDialog,
    private common: CommonService,
    private _router: Router,
  ) {
    super();
    if (!this.common.isEmptyObj(this.authService.currentUserValue)) {
      this.userInfo = this.authService.currentUserValue;
    }
    this.tmplInfo = {
      tmpltype: "",
      emailsub: "",
      emailbody: ""
    }
  }
  ngOnInit() {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true
    });
    this.loadTemplateTypes();
  }

  async loadTemplateTypes() {
    let that = this;
    let apiResp = await this._api.post('/appapi/emailtmpl/GetTmpls', {}).toPromise().then((resp: any) => resp as any);
    if (apiResp.code == '0') {
      if (apiResp.data != null && apiResp.data != undefined && apiResp.data.list != undefined) {
        that.tmplTypesList = apiResp.data.list;
      }
    }
  }
  onSubmit() {
    let that = this;
    if (this.common.isEmpty(this.tmplInfo.tmpltype)) {
      this.common.errorNotify('Please select template type');
      return;
    }
    if (this.common.isEmpty(this.tmplInfo.emailsub)) {
      this.common.errorNotify('Please enter template subject');
      return;
    }
    if (this.common.isEmpty(this.tmplInfo.emailbody)) {
      this.common.errorNotify('Please enter template body');
      return;
    }
    let payLoad = {
      tmpltype: this.tmplInfo.tmpltype,
      emailsub: this.tmplInfo.emailsub,
      emailbody: this.tmplInfo.emailbody
    };
    this.submitEffect = true;
    this._api.post('/appapi/emailtmpl/add', payLoad).subscribe({
      next(resp: any) {
        this.submitEffect = false;
        if (resp.code == '0') {
          that._api.successNotify(resp.message);
          setTimeout(() => {
            that._router.navigate(['/platform/emailtmpls', 'list']);
          }, 2000);
        }
        else {
          that._api.errorNotify(resp?.message);
          setTimeout(() => {
            that._router.navigate(['/platform/emailtmpls', 'list']);
          }, 2000);
        }
      },
      error(msg: any) {
        console.log(msg);
        that._api.errorNotify(msg)
      },
    });
  }
  addNewTmplType() {
    let that =this;
    const dialogRef = this.dialog.open(TmplTypeAddComponent, {
      width: '500px',
      disableClose: false,
      data: {
        size: 'SMALL',
        dialogTitle:'Add Email Template Type'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.reload == true) {
         that.loadTemplateTypes();
      }
    });
  }
  override ngOnDestroy(): void {
    this.editor.destroy();
  }
}
