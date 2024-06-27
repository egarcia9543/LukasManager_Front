import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {
  @Input() inputType: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() maxVal: number = 0;
  @Input() minVal: number = 0;

  public onChange: any = () => {};

  public onTouched: any = () => {};

  public writeValue(value: string): void {
    this.onChange(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(event: Event): void {
    this.onChange((event.target as HTMLInputElement).value);
  }
}
