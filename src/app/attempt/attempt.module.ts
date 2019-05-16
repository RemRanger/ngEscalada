import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptListComponent } from './attempt-list.component';
import { SharedModule } from '../shared/shared.module';
import { AttemptEditComponent } from './attempt-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AttemptDeleteComponent } from './attempt-delete.component';
import { LoggedInGuard } from '../shared/logged-in.guard';

@NgModule
  ({
    declarations: [AttemptListComponent, AttemptEditComponent, AttemptDeleteComponent],
    imports:
      [CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild
          ([
            { path: 'attempt-edit/:id/:sessionId', canActivate: [LoggedInGuard], component: AttemptEditComponent },
            { path: 'attempt-delete/:id', canActivate: [LoggedInGuard], component: AttemptDeleteComponent }
          ]),
      ],
    exports: [AttemptListComponent]
  })
export class AttemptModule { }
