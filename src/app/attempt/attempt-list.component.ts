import { Component, OnInit, Input } from '@angular/core';
import { Attempt } from './attempt';
import { AttemptService } from './attempt.service';
import { Utils } from '../shared/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'esc-attempt-list',
  templateUrl: './attempt-list.component.html',
  styleUrls: ['./attempt-list.component.css']
})
export class AttemptListComponent implements OnInit
{
  @Input() sessionId: number;
  @Input() userId: number;
  attempts: Attempt[];
  errorMessage = '';
  resultPic: string;

  constructor(private attemptService: AttemptService, private router: Router) { }

  ngOnInit()
  {
    this.attemptService.getAttempts(this.sessionId, this.userId).subscribe
      (
        attempts => this.attempts = attempts || [],
        error => this.errorMessage = <any>error
      );
  }

  getResultPic(result: number): string { return Utils.getResultPic(result); }

  getApiUrl(): string { return this.attemptService.apiUrlRead; }

  addAttempt()
  {
    this.router.navigate(['/attempt-edit', 0, this.sessionId]);
  }
}
