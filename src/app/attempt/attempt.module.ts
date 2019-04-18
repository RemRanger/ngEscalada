import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptListComponent } from './attempt-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule
({
  declarations: [AttemptListComponent],
  imports: [CommonModule, SharedModule],
  exports: [AttemptListComponent]
})
export class AttemptModule { }
