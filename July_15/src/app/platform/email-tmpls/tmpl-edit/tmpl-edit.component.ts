import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, APICallService, CommonService } from '@core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-tmpl-edit',
  templateUrl: './tmpl-edit.component.html',
  styleUrls: ['./tmpl-edit.component.scss']
})
export class TmplEditComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  userInfo: any = {};
  tmplTypesList: any[] = [];
  dialogTitle: string;
  breadscrums: any[] = [
    {
      title: 'Update',
      items: [
        {
          title: 'Email Template',
          url: '/platform/emailtmpls/list',
        },
      ],
      active: 'Update',
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
  tmplCode: string = "";
  shimmerEffect: boolean = false;
  submitEffect: boolean = false;
  constructor(
    private authService: AuthService,
    private _api: APICallService,
    public dialog: MatDialog,
    private _common: CommonService,
    private _router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    if (!this._common.isEmptyObj(this.authService.currentUserValue)) {
      this.userInfo = this.authService.currentUserValue;
    }
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.tmplCode = this._common.isEmpty(params.get('code')) ? "" : params.get('code');
    });
    this.tmplInfo = {
      tmpltype: "",
      emailsub: "",
      emailbody: ""
    }
  }
  ngOnInit() {
    this.editor = new Editor();
    this.getTempl();
    this.loadTemplateTypes();
  }

  async getTempl() {
    let that = this;
    this.shimmerEffect = true;
    let apiResp = await this._api.post('/appapi/emailtmpl/GetTmplByCode', { tmplcode: this.tmplCode }).toPromise().then((resp: any) => resp as any);
    if (apiResp.code == '0') {
      if (apiResp.data != null && apiResp.data != undefined) {
        that.tmplInfo = apiResp.data;
        this.shimmerEffect = false;
      }
    }
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
    if (this._common.isEmpty(this.tmplInfo.tmpltype)) {
      this._common.errorNotify('Please select template type');
      return;
    }
    if (this._common.isEmpty(this.tmplInfo.emailsub)) {
      this._common.errorNotify('Please enter template subject');
      return;
    }
    if (this._common.isEmpty(this.tmplInfo.emailbody)) {
      this._common.errorNotify('Please enter template body');
      return;
    }

    let payLoad = {
      code:this.tmplCode,
      tmpltype: this.tmplInfo.tmpltype,
      emailsub: this.tmplInfo.emailsub,
      emailbody: this.tmplInfo.emailbody
    };
    this.submitEffect = true;
    this._api.post('/appapi/emailtmpl/update', payLoad).subscribe({
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
  override ngOnDestroy(): void {
    this.editor.destroy();
  }
}
