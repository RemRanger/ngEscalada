import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionListComponent } from './session-list.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionDetailGuard } from './session-detail.guard';
import { AttemptModule } from '../attempt/attempt.module';

@NgModule({
  declarations: [SessionListComponent, SessionDetailComponent],
  imports:
    [
      CommonModule,
      RouterModule.forChild
        ([
          { path: 'sessions', component: SessionListComponent },
          {
            path: 'sessions/:id',
            canActivate: [SessionDetailGuard],
            component: SessionDetailComponent
          },
        ]),
      AttemptModule
    ]
})
export class SessionModule { }
