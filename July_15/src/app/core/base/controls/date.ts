import { MasterBase } from '../master-base'

export class DateField extends MasterBase<string> {
    override controlType = 'date';
}