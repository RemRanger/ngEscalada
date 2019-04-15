import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptListComponent } from './attempt-list.component';

@NgModule
({
  declarations: [AttemptListComponent],
  imports: [CommonModule],
  exports: [AttemptListComponent]
})
export class AttemptModule { }
