import { MasterBase } from '../master-base'

export class Textarea extends MasterBase<string> {
  override controlType = 'textarea';
}