import { MasterBase } from '../master-base'

export class Password extends MasterBase<string> {
  override controlType = 'password';
}