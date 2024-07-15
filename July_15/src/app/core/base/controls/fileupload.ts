import { MasterBase } from '../master-base'

export class FileDocUpload extends MasterBase<string> {
  override controlType = 'fileupload';
}