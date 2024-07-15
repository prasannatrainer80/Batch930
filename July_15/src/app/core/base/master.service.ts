import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { CommonService } from '@core';
import { MasterBase } from './master-base';
import { Dropdown } from './controls/dropdown';
import { Textbox } from './controls/textbox';
import { Label } from './controls/label';
import { Checkbox } from './controls/checkbox';
import { Textarea } from './controls/textarea';
import { Radio } from './controls/radio';
import { DateField } from './controls/date';
import { Header } from './controls/header';
import { HiddenField } from './controls/hidden';
import { Email } from './controls/email';
import { MultiDropdown } from './controls/multidropdown';
import { URL } from './controls/url';
import { Password } from './controls/password';
import { LabelValue } from './controls/labelvalue';
import { FileDocUpload } from './controls/fileupload';

@Injectable()
export class MasterService {
  constructor(private common: CommonService) { }

  getTemplateFields(formFields: any[]) {
    const tmpls: MasterBase<string>[] = [];
    if (formFields?.length > 0) {
      formFields.forEach((field) => {

        // const cssGroupName: string = field?.grpname || '';
        // let cssClassName: string = field?.className || '';
        // if (cssGroupName != '') {
        //   cssClassName = `${cssClassName} grpdisp`;
        //   if (cssGroupName.indexOf(',') > -1) {
        //     cssGroupName.split(',').forEach((x: any) => {
        //       if (x != '') {
        //         cssClassName += ` grpdisp${cssGroupName}`;
        //       }
        //     });
        //   }
        //   else {
        //     cssClassName = `${cssClassName} grpdisp grpdisp${cssGroupName}`;
        //   }
        // }

        switch (field.controlType) {
          case 'hidden': {
            tmpls.push(
              new HiddenField({
                key: field.key,
                label: field.label,
                value: field.value,
                required: false,
                className: '',
                order: field.order,
                disabled: field.disabled,
              })
            );
            break;
          }
          case 'textbox': {
            tmpls.push(
              new Textbox({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                pattern: field.pattern,
                disabled: field.disabled,
                validatetype: field.validatetype,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'password': {
            tmpls.push(
              new Password({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                pattern: field.pattern,
                disabled: field.disabled,
                validatetype: field.validatetype,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'email': {
            tmpls.push(
              new Email({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                pattern: "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
                disabled: field.disabled,
                validatetype: field.validatetype,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'textarea': {
            tmpls.push(
              new Textarea({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                disabled: field.disabled,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'dropdown': {
            tmpls.push(
              new Dropdown({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                options: field.options,
                disabled: field.disabled || false,
                targetid: field.targetid,
                changeinput: field.changeinput,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'radio': {
            tmpls.push(
              new Radio({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                options: field.options,
                disabled: field.disabled,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'checkbox': {
            tmpls.push(
              new Checkbox({
                key: field.key,
                label: field.label,
                value: '',
                required: false,
                className: field.className,
                order: field.order,
                disabled: field.disabled,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'label': {
            tmpls.push(
              new Label({
                key: field.key,
                label: field.label,
                value: '',
                required: false,
                className: field.className,
                order: field.order,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'labelvalue': {
            tmpls.push(
              new LabelValue({
                key: field.key,
                label: field.label,
                order: field.order,
                value: field.value,
                required: false,
                className: field.className,
                disabled: true,
              })
            );
            break;
          }
          case 'date': {
            let dateVal = '';
            if (!this.common.isEmpty(field.value)) {
              dateVal = formatDate(field.value, 'yyyy-MM-dd', 'en-GB');
            }
            tmpls.push(
              new DateField({
                key: field.key,
                label: field.label,
                value: dateVal,
                required: field.required,
                className: field.className,
                order: field.order,
                disabled: field.disabled,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'multidropdown': {
            if (field.value != undefined && field.value != null && field.value != "") {
              if (typeof field.value == 'string') {
                try{
                  field.value = JSON.parse(field.value);
                }catch{
                  field.value = field.value;
                }                
              }
            }
            tmpls.push(
              new MultiDropdown({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                options: field.options,
                disabled: field.disabled,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'header': {
            tmpls.push(
              new Header({
                key: field.key,
                label: field.label,
                value: '',
                required: false,
                className: field.className,
                order: field.order,
                icon: field.icon,
                maxlength: field.maxlength,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'url': {
            tmpls.push(
              new URL({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                pattern: "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
                disabled: field.disabled,
                validatetype: field.validatetype,
                maxlength: field.maxlength,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
          case 'fileupload': {
            tmpls.push(
              new FileDocUpload({
                key: field.key,
                label: field.label,
                value: field.value,
                required: field.required,
                className: field.className,
                order: field.order,
                tooltip: field.tooltip,
                errmsg: field.errmsg,
                grpname: field.grpname,
                showonchng: field?.showonchng || false,
                onchngshow: field?.onchngshow || false,
                hidden: !this.common.isEmpty(field.grpname)
              })
            );
            break;
          }
        }
      });
      if (tmpls.length > 0) {
        return tmpls.sort((a, b) => a.order - b.order);
      }
      else return tmpls;
    }
    return tmpls;
  }
}
