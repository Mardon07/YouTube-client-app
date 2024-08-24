import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBorderColor]',
})
export class BorderColorDirective implements OnInit {
  @Input() appBorderColor: number | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setBorderColor();
  }

  private setBorderColor(): void {
    if (!this.appBorderColor) return;

    let borderColor = '';
    const daysSincePublished = this.appBorderColor;

    if (daysSincePublished! > 180) {
      borderColor = 'red';
    } else if (daysSincePublished!> 30) {
      borderColor = 'yellow';
    } else if (daysSincePublished! > 7) {
      borderColor = 'green';
    } else {
      borderColor = 'blue';
    }

    this.el.nativeElement.style.borderBottom = `12px solid ${borderColor}`;
  }
}
