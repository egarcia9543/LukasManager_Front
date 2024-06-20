import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-input-calendar',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
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
