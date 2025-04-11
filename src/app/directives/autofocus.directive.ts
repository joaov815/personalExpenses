import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[peAutofocus]",
  standalone: true,
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private readonly _el: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this._el.nativeElement.focus();
  }
}
