import { MasterBase } from '../master-base'

export class Radio extends MasterBase<string> {
    override controlType = 'radio';
}