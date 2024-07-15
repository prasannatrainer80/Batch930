import { MasterBase } from '../master-base'

export class Email extends MasterBase<string> {
  override controlType = 'email';
}