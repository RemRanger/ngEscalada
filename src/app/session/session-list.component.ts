import { Component, OnInit, Input } from '@angular/core';
import { ISession } from './session';
import { SessionService } from './session.service';
import { Utils } from '../shared/utils';

@Component({
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit
{
  sessions: ISession[] = [];
  errorMessage = '';
  userId: number;

  constructor(private sessionService: SessionService) { }

  ngOnInit()
  {
    this.userId = Utils.getUserId();
    this.sessionService.getSessions(this.userId).subscribe
      (
        sessions => this.sessions = sessions,
        error => this.errorMessage = <any>error
      );

  }

  getApiUrl(): string { return this.sessionService.apiUrl; }
}
