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
import { SessionDeleteComponent } from './session-delete.component';
import { SessionListGuard } from './session-list.guard';

@NgModule({
  declarations: [SessionListComponent, SessionDetailComponent, SessionEditComponent, SessionDeleteComponent],
  imports:
    [
      CommonModule,
      SharedModule,
      FormsModule,
      RouterModule.forChild
        ([
          { path: 'sessions', canActivate: [SessionListGuard], component: SessionListComponent },
          { path: 'sessions/:id/:userId', canActivate: [SessionDetailGuard], component: SessionDetailComponent },
          { path: 'session-edit/:id/:userId', component: SessionEditComponent },
          { path: 'session-delete/:id/:userId', component: SessionDeleteComponent }
        ]),
      SharedModule,
      AttemptModule
    ]
})
export class SessionModule { }
