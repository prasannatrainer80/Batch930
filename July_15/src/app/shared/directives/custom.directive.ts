import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[customDir]',
})
export class CustomDirective {
  @Input() validatetype: string = '';
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    switch (this.validatetype) {
      case 'number':
        {
          this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'decimal':
        {
          this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'alpha':
        {
          this._el.nativeElement.value = initalValue.replace(/[^A-Za-z]*/g, '');
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'alphanumeric':
        {
          this._el.nativeElement.value = initalValue.replace(
            /[^a-zA-Z0-9]*/g,
            ''
          );
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'alphanumeric_s':
        {
          this._el.nativeElement.value = initalValue.replace(
            /[^a-zA-Z0-9 ]*/g,
            ''
          );
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'titlechars':
        {
          this._el.nativeElement.value = initalValue.replace(
            /[^a-zA-Z0-9-_ ,#^*;:.@]/g,
            ''
          );
          if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
          }
        }
        break;
      case 'website':
         
        break;
      default: {
      }
    }
  }
}
