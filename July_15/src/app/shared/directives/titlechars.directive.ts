import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[titleChars]',
})
export class TitleCharsDirective {
  constructor(private _el: ElementRef) { }
  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(
      /[^a-zA-Z0-9-_ ,#^*;:.@]/g,
      ''
    );
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
