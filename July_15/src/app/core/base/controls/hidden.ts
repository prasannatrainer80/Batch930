import { MasterBase } from '../master-base'

export class HiddenField extends MasterBase<string> {
    override controlType = 'hidden';
    override className ='col-sm-1';
}