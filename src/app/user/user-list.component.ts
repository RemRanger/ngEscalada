import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit
{
  users: User[] = [];
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit()
  {
    this.userService.getUsers().subscribe
    (
      users => this.users = users,
      error => this.errorMessage = <any>error
    );
  }

  getApiUrl(): string { return this.userService.apiUrl; }
}
