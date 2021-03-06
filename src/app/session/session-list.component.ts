import { Component, OnInit, Input } from '@angular/core';
import { Session } from './session';
import { SessionService } from './session.service';
import { Utils } from '../shared/utils';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit
{
  sessions: Session[] = [];
  errorMessage = '';
  userId: number;

  constructor(private sessionService: SessionService, private userService: UserService, private router: Router) { }

  ngOnInit()
  {
    this.userId = this.userService.getCurrentUserId();
    console.log("Session list's user Id: ", this.userId);
    if (this.userId)
    {
      this.sessionService.getSessions(this.userId).subscribe
        (
          sessions => this.sessions = sessions,
          error => this.errorMessage = <any>error
        );
    }
  }

  getApiUrl(): string { return this.sessionService.apiUrlRead; }

  addSession()
  {
    this.router.navigate(['/session-edit', 0, this.userId]);
  }
}
