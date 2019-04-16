import { Component, OnInit } from '@angular/core';
import { ClimberService } from './climber.service';
import { IClimber } from './climber';

@Component({
  templateUrl: './climber-list.component.html',
  styleUrls: ['./climber-list.component.css']
})
export class ClimberListComponent implements OnInit
{
  climbers: IClimber[] = [];
  errorMessage = '';

  constructor(private climberService: ClimberService) { }

  ngOnInit()
  {
    this.climberService.getClimbers().subscribe
    (
      climbers => this.climbers = climbers,
      error => this.errorMessage = <any>error
    );
  }

  getApiUrl(): string { return this.climberService.apiUrl; }
}
