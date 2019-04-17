import { Component, OnInit, LOCALE_ID, Inject, Input } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'esc-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit
{
  @Input() date: Date;
  selectedDate: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;

  constructor(@Inject(LOCALE_ID) public locale: string) { }

  ngOnInit()
  {
    this.selectedDate = new Date(this.date);
    this.selectedYear = this.selectedDate.getFullYear();
    this.selectedMonth = this.selectedDate.getMonth() + 1;
    this.selectedDay = this.selectedDate.getDate();
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
    return formatDate(new Date(this.selectedYear, month - 1, 1), 'MMMM', this.locale);
  }

  getDays()
  {
    let days: number[] = [];
    for (var day = 1; day <= new Date(this.selectedYear, this.selectedMonth, 0).getDate(); day++)
      days.push(day);

    return days;
  }
}
