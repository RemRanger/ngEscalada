import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { AttemptService } from '../attempt/attempt.service';
import { IAttempt, AttemptGroup } from '../attempt/attempt';

@Component({
  selector: 'esc-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit
{
  attempts: IAttempt[] = [];
  errorMessage = '';

  constructor(private attemptService: AttemptService) { }

  ngOnInit()
  {
    this.attemptService.getAllAttempts().subscribe
      (
        attempts => this.attempts = attempts,
        error => this.errorMessage = <any>error
      );
  }

  getAttemptGroups(): AttemptGroup[]
  {
    let attemptGroups: AttemptGroup[] = [];
    let lastSessionId: number = null
    let attemptGroup: AttemptGroup;
    for (let attempt of this.attempts.sort((a, b) => { return b.sessionId - a.sessionId }))
    {
      if (attemptGroup == null  || lastSessionId == null || attempt.sessionId != lastSessionId)
      {
        attemptGroup = new AttemptGroup()
        attemptGroup.sessionId = attempt.sessionId;
        attemptGroup.userId = attempt.userId;
        attemptGroups.push(attemptGroup);
      }
      attemptGroup.attempts.push(attempt);

      lastSessionId = attempt.sessionId;
    }
    return attemptGroups;
  }

  getResultPic(result: number): string { return Utils.getResultPic(result); }
}
