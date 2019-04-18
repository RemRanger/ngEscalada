import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionListComponent } from './session-list.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionDetailGuard } from './session-detail.guard';
import { AttemptModule } from '../attempt/attempt.module';
import { SessionEditComponent } from './session-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SessionListComponent, SessionDetailComponent, SessionEditComponent],
  imports:
    [
      CommonModule,
      SharedModule,
      FormsModule,
      RouterModule.forChild
        ([
          { path: 'sessions', component: SessionListComponent },
          {
            path: 'sessions/:id/:userId',
            canActivate: [SessionDetailGuard],
            component: SessionDetailComponent
          },
          { path: 'session-edit/:id/:userId', component: SessionEditComponent }
        ]),
      SharedModule,
      AttemptModule
    ]
})
export class SessionModule { }
