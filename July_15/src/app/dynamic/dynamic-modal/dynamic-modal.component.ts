import { Component, OnInit, Inject, ViewChildren, QueryList, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { APICallService, CommonService, MasterService } from '@core';
import { formatDate } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  providers: [MasterService],
})
export class DynamicModalComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  @ViewChildren('sectionElement') elements: QueryList<ElementRef>;

  currentElement: any = '';
  customActionText: string = 'Submit';
  customActionURL: string = '/dataapi/module/manage';
  // multiDropdownId: string = '';
  form!: FormGroup;
  dialogTitle: string = "";
  actionType: string = "";
  shimmerEffect: boolean = false;
  submitEffect: boolean = false;
  showHelpText: boolean = false;
  helpText: string = "";
  loading: boolean = false;

  moduleElements: any[] = [];
  formFields: any[];
  hiddenFields: any[];
  fieldCnt: number = 0;

  tabHeaders: any[] = [];
  tabCount: number = 0;

  contentStyle: string = '';

  constructor(
    private _base: MasterService,
    private common: CommonService,
    private apiCall: APICallService,
    public dialogRef: MatDialogRef<DynamicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.shimmerEffect = true;
    this.submitEffect = false;
    this.dialogTitle = data?.dialogTitle;
    this.contentStyle = data?.height || 'height: 350px';

    if (this.data?.action == 'edit') this.actionType = 'update';
    else this.actionType = this.actionType = 'insert';
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loading = true;
    this.apiCall.post(`/dataapi/config/get`, { module: this.data?.module, action: this.actionType }).subscribe((pagedData: any) => {

      let titleHeader: string = '';
      if (!this.common.isEmptyObj(pagedData?.breadcrumb)) {
        titleHeader = pagedData?.breadcrumb[0]?.items[0]?.title || pagedData?.breadcrumb[0]?.title || this.data?.dialogTitle || '';
      }
      this.helpText = pagedData?.help || '';
      this.customActionURL = pagedData?.actionurl || '/dataapi/module/manage';
      this.customActionText = pagedData?.actiontext || 'Submit';
      // this.multiDropdownId = pagedData?.multiselectid || '';

      if (this.actionType != 'update') {
        this.dialogTitle = "Add - " + titleHeader;
      }
      else {
        this.dialogTitle = "Update - " + this.dialogTitle;
      }

      if (!this.common.isEmptyObj(pagedData?.data)) {

        let formControls: any[] = pagedData?.data || [];

        this.tabHeaders = formControls?.filter((h) => h.controlType == 'header').map((x) => {
          return {
            key: x.key,
            label: x.label
          }
        });

        if (this.actionType == 'update') {
          this.apiCall.post(`/dataapi/module/get`, { module: this.data?.module, code: this.data?.code }).subscribe((itemData: any) => {
            if (!this.common.isEmptyObj(itemData?.data)) {
              this.moduleElements = pagedData?.data;
              this.moduleElements.forEach((element: any) => {
                element.value = itemData?.data[element.key] || '';
              });

              this.hiddenFields = this.moduleElements.filter((h: any) => h?.controlType.indexOf('hidden') > -1);
              const pgElements: any = this._base.getTemplateFields(this.moduleElements);
              this.form = this.toFormGroup(pgElements);
              this.formFields = pgElements.filter((h: any) => (h?.controlType != 'hidden' && h?.controlType != 'doclist'));

              this.loading = false;
              this.shimmerEffect = false;

              this.moduleElements?.filter((x: any) => x?.controlType.indexOf('dropdown') > -1 && x?.changeinput == "" && x?.options?.length == 0)?.forEach((element: any) => {
                this.DropdownFill(element.key);
              });

              this.moduleElements?.filter((x: any) => x?.controlType.indexOf('dropdown') > -1 && x?.changeinput != "" && x?.changeinput?.split(',')?.length > 0)?.forEach((element: any) => {
                this.DropdownFillOnLoad(element.key);
              });
            }
          });
        }
        else {
          this.moduleElements = pagedData?.data;
          this.moduleElements?.filter((x: any) => x?.controlType?.indexOf('dropdown') > -1)?.forEach((element: any) => {
            element.value = element?.options?.length > 0 ? element?.options[0]?.value || '' : '';
          });

          this.hiddenFields = this.moduleElements.filter((h: any) => h?.controlType.indexOf('hidden') > -1);
          const pgElements: any = this._base.getTemplateFields(this.moduleElements);
          this.form = this.toFormGroup(pgElements);
          this.formFields = pgElements.filter((h: any) => (h?.controlType != 'hidden' && h?.controlType != 'doclist'));

          this.loading = false;
          this.shimmerEffect = false;

          this.moduleElements?.filter((x: any) => x?.controlType.indexOf('dropdown') > -1 && x?.changeinput == "" && x?.options?.length == 0)?.forEach((element: any) => {
            this.DropdownFill(element.key);
          });
        }
      }
    });
  }

  scrollToElement(index: number): void {
    const element = this.elements.toArray()[index].nativeElement;
    element.scrollIntoView({ behavior: 'smooth', duration: 2000, easing: 'linear' });
  }

  changeDate(evt: any, key: string) {
    let val = formatDate(evt.value, 'yyyy-MM-dd', 'en-GB');
    this.form.get(key)?.setValue(val);
  }

  toFormGroup(masters: any[]) {
    const group: any = {};
    masters.forEach(mst => {
      if (mst?.controlType == 'fileupload') {
        group[mst.key] = new FormControl();
      }
      else {
        group[mst.key] = mst?.required ? new FormControl({ value: mst?.value || '', disabled: mst?.disabled || false }, Validators.required)
          : new FormControl({ value: mst?.value || '', disabled: mst?.disabled || false });
      }
    });

    return new FormGroup(group);
  }

  /*
  async __submitForm__() {
    if (this.actionType.toLowerCase() == 'view') { return; }

    this.submitEffect = true;

    let payLoad = this.form.getRawValue();
    payLoad = { ...payLoad, ...{ module: this.data?.module, action: this.actionType } };

    if (!this.common.isEmpty(this.multiDropdownId) && !this.common.isEmpty(payLoad[this.multiDropdownId])) {

      const multiSelectValues = payLoad[this.multiDropdownId].split(',') || [];

      try { delete payLoad[this.multiDropdownId]; } catch (e) { }

      const respData: any = await this.SubmitMultiDropdownForms(multiSelectValues, payLoad);

      this.loading = false;
      this.submitEffect = false;

      if (respData?.code == '0' || respData?.data?.code == '0') {
        this.common.successNotify(respData?.message || respData?.data?.message || 'Data saved successfully !');
        this.dialogRef.close({ reload: true });
      }
      else {
        this.common.errorNotify(respData?.message || respData?.data?.message || 'Sorry, error in process your request !');
      }
    }
    else {
      this.loading = true;
      this.apiCall.post(this.customActionURL, payLoad).subscribe((itemData: any) => {
        this.loading = false;
        this.submitEffect = false;
        if (itemData?.code == '0' || itemData?.data?.code == '0') {
          this.common.successNotify(itemData?.message || itemData?.data?.message || 'Data saved successfully !');
          this.dialogRef.close({ reload: true });
        }
        else {
          this.common.errorNotify(itemData?.message || itemData?.data?.message || 'Sorry, error in process your request !');
        }
      });
    }

  }

  async SubmitMultiDropdownForms(multiSelectValues: any, formPayload: any) {
    let _resp = { code: '0', message: 'Data updated successfully!' };
    multiSelectValues.forEach((elementValue: any) => {

      let payLoad: any = { ...{}, ...formPayload };

      payLoad[this.multiDropdownId] = elementValue;

      this.apiCall.post(this.customActionURL, payLoad).subscribe((itemData: any) => {
        _resp = itemData;
      });

    });
    return _resp;
  }
  */

  async submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.submitEffect = true;

    let payLoad = this.form.getRawValue();

    const filesData: any = this.moduleElements?.filter((x: any) => x?.controlType == 'fileupload');

    if (!this.common.isEmptyObj(filesData)) {
      for (let iCnt = 0; iCnt < filesData.length; iCnt++) {
        let uploadCode: any = await this.uploadFileData(payLoad[filesData[iCnt]?.key]);
        payLoad[filesData[iCnt]?.key] = uploadCode;
      }
    }

    payLoad = { ...payLoad, ...{ module: this.data?.module, action: this.actionType } };

    this.apiCall.post(this.customActionURL, payLoad).subscribe((itemData: any) => {
      this.submitEffect = false;
      this.loading = false;

      if (itemData?.code == '0' || itemData?.data?.code == '0') {
        this.common.successNotify(itemData?.message || itemData?.data?.message || 'Data saved successfully !');
        this.dialogRef.close({ reload: true });
      }
      else {
        this.common.errorNotify(itemData?.message || itemData?.data?.message || 'Sorry, error in process your request !');
      }

    });
  }

  DropdownFillOnLoad(elementId: string) {
    this.loading = true;
    const payLoad: any = {
      module: this.data?.module,
      action: this.actionType,
      key: elementId,
      val: "",
      loadtype: "self"
    };

    let itemKeys: any[] = [];
    itemKeys = this.moduleElements?.find(x => x.key == elementId)?.changeinput?.split(',');
    if (itemKeys?.length > 0) {
      for (let i = 0; i < itemKeys.length; i++) {
        payLoad[itemKeys[i]] = this.moduleElements?.find(x => x.key == itemKeys[i])?.value;
      }
    }

    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.moduleElements.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;

        const hasAltCtrl: boolean = this.moduleElements.find(x => x.key == itemData?.data?.key)?.showaltctrl || false;

        if (hasAltCtrl) {
          if (this.common.isEmptyObj(itemData?.data?.options)
            || (itemData?.data?.options?.length == 1 && itemData?.data?.options[0]?.value == "")) {
            this.formFields.find(x => x.key == itemData?.data?.key).altctrl = true;
          }
          else {
            this.formFields.find(x => x.key == itemData?.data?.key).value = "";
            this.formFields.find(x => x.key == itemData?.data?.key).altctrl = false;
          }
        }
      }
    });
  }

  DropdownFill(elementId: string) {
    this.loading = true;
    const payLoad: any = {
      module: this.data?.module,
      action: this.actionType,
      key: elementId,
      val: "",
      loadtype: "self"
    };

    this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
      this.loading = false;
      if (!this.common.isEmpty(itemData?.data?.key)) {
        this.moduleElements.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;
        this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;

        const hasAltCtrl: boolean = this.moduleElements.find(x => x.key == itemData?.data?.key)?.showaltctrl || false;

        if (hasAltCtrl) {
          if (this.common.isEmptyObj(itemData?.data?.options)
            || (itemData?.data?.options?.length == 1 && itemData?.data?.options[0]?.value == "")) {
            this.formFields.find(x => x.key == itemData?.data?.key).altctrl = true;
          }
          else {
            this.formFields.find(x => x.key == itemData?.data?.key).value = "";
            this.formFields.find(x => x.key == itemData?.data?.key).altctrl = false;
          }
        }
      }
    });
  }

  TargetChange(elementId: string, targetId: string, elementValue: any) {
    let element: any = this.formFields?.find((x: any) => x?.key == elementId);
    if (!this.common.isEmptyObj(element) && element?.onchngshow == true) {
      let showValue: string = `${element?.key?.toLowerCase()}_${elementValue?.toLowerCase()}`;

      this.formFields.filter((x: any) => x?.showonchng == true && !this.common.isEmpty(x?.grpname)).forEach((s: any) => {
        if (s?.grpname?.toLowerCase().indexOf(showValue) > -1 || s.key == elementId) {
          s.hidden = false;
        }
        else {
          s.hidden = true;
        }
      });

    }

    if (!this.common.isEmpty(targetId) && targetId.toUpperCase() != 'NA') {
      this.loading = true;
      let payLoad: any = {
        module: this.data?.module,
        action: this.actionType,
        key: elementId,
        loadtype: "target"
      };

      let itemKeys: any[] = [];
      itemKeys = this.formFields.find(x => x.key == targetId)?.changeinput?.split(',');
      if (itemKeys?.length > 0) {
        let formPayLoad = this.form.getRawValue();
        for (let i = 0; i < itemKeys.length; i++) {
          payLoad[itemKeys[i]] = formPayLoad[itemKeys[i]];
        }
      }

      this.apiCall.post(`/dataapi/module/change`, payLoad).subscribe((itemData: any) => {
        this.loading = false;
        if (!this.common.isEmpty(itemData?.data?.key)) {
          this.formFields.find(x => x.key == itemData?.data?.key).options = itemData?.data?.options;

          const hasAltCtrl: boolean = this.moduleElements.find(x => x.key == itemData?.data?.key)?.showaltctrl || false;

          if (hasAltCtrl) {
            if (this.common.isEmptyObj(itemData?.data?.options)
              || (itemData?.data?.options?.length == 1 && itemData?.data?.options[0]?.value == "")) {
              this.formFields.find(x => x.key == itemData?.data?.key).altctrl = true;
            }
            else {
              this.formFields.find(x => x.key == itemData?.data?.key).value = "";
              this.formFields.find(x => x.key == itemData?.data?.key).altctrl = false;
            }
          }
        }
      });
    }
  }

  isChecked(field: any): boolean {
    return field?.options?.length > 0 && this.form.get(field.key)?.value?.length === field?.options?.length;
  }

  isIndeterminate(field: any): boolean {
    return field?.options?.length > 0 && this.form.get(field.key)?.value?.length < field?.options?.length;
  }

  toggleSelection(change: MatCheckboxChange, field: any): void {
    if (field?.options?.length > 0 && change.checked) {
      let selValues: any[] = []

      field?.options?.forEach((ele: any) => {
        selValues.push(ele.value);
      });
      this.form.get(field.key)?.setValue(selValues);
    } else {
      this.form.get(field.key)?.setValue([]);
    }
  }

  checkboxSelection(change: MatCheckboxChange, elementId: any): void {

    let elementValue = 'false';
    if (change.checked) {
      elementValue = 'true';
    }

    let element: any = this.moduleElements.find(x => x.key == elementId);

    if (!this.common.isEmptyObj(element) && element?.onchkchngshow == true) {
      let showValue: string = `${element?.key?.toLowerCase()}_${elementValue?.toLowerCase()}`;

      this.formFields.filter((x: any) => x?.showonchng == true && !this.common.isEmpty(x?.grpname)).forEach((s: any) => {

        if (s?.grpname?.toLowerCase().indexOf(showValue) > -1 || s.key == elementId) {
          s.hidden = false;
        }
        else {
          s.hidden = true;
        }

      });

    }

    if (change.checked && !this.common.isEmpty(element?.copyfrom) && !this.common.isEmpty(element?.copyto)) {

      this.formFields.filter((x: any) => x?.key?.toLowerCase().indexOf(element?.copyfrom + '_') > -1).forEach((s: any) => {
        let _toKeyName = `${element?.copyto}_${s.key.split('_')[1]}`;
        if (this.form.get(_toKeyName)) {
          // this.formFields.find(x => x.key == _toKeyName).value = s.value;
          this.form.get(_toKeyName)?.setValue(this.form.get(s.key)?.value);
        }
      });
    }
  }

  async uploadFileData(fileObj: any) {
    let uploadResp: any = await new Promise((resolve, reject) => {
      const formdata: FormData = new FormData();
      formdata.append('file', fileObj);
      this.apiCall.UploadFile(formdata).subscribe((response: any) => {
        resolve(response);
      });
    });

    if (uploadResp?.code == '0') {
      return uploadResp?.data;
    }
    else {
      return '';
    }
  }

}
