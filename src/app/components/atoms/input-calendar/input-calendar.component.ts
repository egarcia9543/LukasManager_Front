import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-calendar',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCalendarComponent),
      multi: true
    }
  ],
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './input-calendar.component.html',
  styleUrl: './input-calendar.component.scss'
})
export class InputCalendarComponent implements ControlValueAccessor{
  @Input() maxDate!: Date;
  @Input() minDate!: Date;
  @Input() label!: string;
  @Input() initialValue!: Date;

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

  public updateValue(value: string): void {
    this.onChange(value);
  }

}
