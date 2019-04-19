import { Component, OnInit, LOCALE_ID, Inject, forwardRef, Provider, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component
  ({
    selector: 'esc-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    providers:
      [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => DatepickerComponent),
          multi: true
        }
      ]
  })

export class DatepickerComponent implements OnInit, ControlValueAccessor 
{
  @Input() inputModel: any;
  @Output() inputModelChange = new EventEmitter<Date>();
  private date: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit()
  {
  }

  registerOnChange(fn: any): void
  {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void
  {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void
  {
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  updateChanges()
  {
    this.date = new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, this.selectedDay, 0, 0, 0, 0));
    console.log("selectedYear:", this.selectedYear);
    console.log("updateChanges:", this.selectedMonth);
    console.log("selectedMonth:", this.selectedDay);
    console.log("selectedDay:", this.date);
    this.onChange(this.value);
  }

  public get value()
  {
    return this.date;
  }

  public set value(date: Date)
  {
    this.date = new Date(date);
    this.updateControls();

    this.onChange(this.date);
    this.onTouched();
  }

  writeValue(date: Date): void
  {
    this.date = new Date(date);
    this.updateControls();
    this.updateChanges();
  }

  private updateControls()
  {
    if (this.date)
    {
      this.selectedYear = this.date.getFullYear();
      this.selectedMonth = this.date.getMonth() + 1;
      this.selectedDay = this.date.getDate();
      console.log("Updated date:", this.date.toLocaleDateString("nl-NL"), this.selectedYear, this.selectedMonth, this.selectedDay);
    }
  }

  // Optional
  onSomeEventOccured(newValue)
  {
    this.value = newValue;
  }

  getYears(): number[]
  {
    let years: number[] = [];
    for (var year = new Date().getFullYear(); year >= 1990; year--)
      years.push(year);

    return years;
  }

  getMonths(): number[]
  {
    let months: number[] = [];
    for (var month = 1; month <= 12; month++)
      months.push(month);

    return months;
  }

  getMonthName(month: number): string
  {
    return formatDate(new Date(2000, month - 1, 1), 'MMMM', this.locale);
  }

  getDays()
  {
    let days: number[] = [];
    for (var day = 1; day <= new Date(this.selectedYear, this.selectedMonth, 0).getDate(); day++)
      days.push(day);

    return days;
  }
}
