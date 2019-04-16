import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';

@NgModule
({
  declarations: [UserListComponent],
  imports:
  [
      CommonModule,
      RouterModule.forChild
      ([
        { path: 'climbers', component: UserListComponent }
      ])
  ]
})
export class UserModule { }
