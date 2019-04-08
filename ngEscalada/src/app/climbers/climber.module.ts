import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClimberListComponent } from './climber-list.component';

@NgModule
({
  declarations: [ClimberListComponent],
  imports:
  [
      CommonModule,
      RouterModule.forChild
      ([
        { path: 'climbers', component: ClimberListComponent }
      ])
  ]
})
export class ClimberModule { }
