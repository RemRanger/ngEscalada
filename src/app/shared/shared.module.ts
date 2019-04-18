import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { FormsModule } from '@angular/forms';
import { WaitLoadingComponent } from './wait-loading.component';

@NgModule({
  declarations: [DatepickerComponent, WaitLoadingComponent],
  imports: [CommonModule, FormsModule],
  exports: [DatepickerComponent, WaitLoadingComponent]
})
export class SharedModule { }
