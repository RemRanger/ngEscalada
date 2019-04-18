import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule
({
  declarations: [UserListComponent],
  imports:
  [
      CommonModule,
      RouterModule.forChild
      ([
        { path: 'climbers', component: UserListComponent }
      ]),
      SharedModule
  ]
})
export class UserModule { }
