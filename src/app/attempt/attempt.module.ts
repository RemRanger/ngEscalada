import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptListComponent } from './attempt-list.component';
import { SharedModule } from '../shared/shared.module';
import { AttemptEditComponent } from './attempt-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule
({
  declarations: [AttemptListComponent, AttemptEditComponent],
  imports:
    [CommonModule,
      SharedModule,
      FormsModule,
      RouterModule.forChild
    ([
      { path: 'attempt-edit/:id/:sessionId', component: AttemptEditComponent }
    ]),
],
  exports: [AttemptListComponent]
})
export class AttemptModule { }
