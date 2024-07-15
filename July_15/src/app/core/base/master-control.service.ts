import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterBase } from './master-base'

@Injectable()
export class MasterControlService {
  toFormGroup(masters: MasterBase<string>[]) {
    const group: any = {};
    masters.forEach(mst => {
      group[mst.key] = mst.required ? new FormControl(mst.value || '', Validators.required)
        : new FormControl(mst.value || '');
    });
    return new FormGroup(group);
  }
}