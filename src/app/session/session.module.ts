import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionListComponent } from './session-list.component';

@NgModule({
  declarations: [SessionListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild
      ([
        { path: 'sessions/:userId', component: SessionListComponent }
      ]),]
})
export class SessionModule { }
