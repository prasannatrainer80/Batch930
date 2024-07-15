import { MasterBase } from '../master-base'

export class Label extends MasterBase<string> {
  override controlType = 'label';
}