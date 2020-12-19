import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Select } from './select';
import { FocusableOption } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'bio-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bio-option' },
  encapsulation: ViewEncapsulation.None,
})
export class OptionComponent implements FocusableOption {
  constructor(private elementRef: ElementRef, @Host() private select: Select) {}

  private _disabled = false;

  @Input() value: any;

  @HostBinding('class.disabled')
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return this.select.isSelected(this.value);
  }

  @HostBinding('attr.tabindex')
  get tabindex(): number {
    return this._disabled ? -1 : 0;
  }

  @HostListener('click')
  onClick(): void {
    if (this._disabled) {
      return;
    }
    this.select.setControlValue(this.value);
    this.select.setViewValue(this.getViewValue());
  }

  @HostListener('keydown.enter')
  onKeydownEnter(): void {
    this.select.setControlValue(this.value);
    this.select.setViewValue(this.getViewValue());
  }

  getViewValue(): SafeHtml {
    return this.elementRef.nativeElement.innerHTML;
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
