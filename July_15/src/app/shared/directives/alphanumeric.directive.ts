import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[AlphaNumeric]',
})
export class AlphaNumericDirective {
  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(
      /[^a-zA-Z0-9 ]*/g,
      ''
    );
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
