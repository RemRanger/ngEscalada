import { Component, OnInit, Input } from '@angular/core';
import { IAttempt } from './attempt';
import { AttemptService } from './attempt.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'esc-attempt-list',
  templateUrl: './attempt-list.component.html',
  styleUrls: ['./attempt-list.component.css']
})
export class AttemptListComponent implements OnInit
{
  @Input() sessionId: number;
  @Input() userId: number;
  attempts: IAttempt[] = [];
  errorMessage = '';
  resultPic: string;

  constructor(private attemptService: AttemptService) { }

  ngOnInit()
  {
    this.attemptService.getAttempts(this.sessionId, this.userId).subscribe
      (
        attempts => this.attempts = attempts,
        error => this.errorMessage = <any>error
      );
  }

  getResultPic(result: number): string { return Utils.getResultPic(result); }

  getApiUrl(): string { return this.attemptService.apiUrlRead; }
}
