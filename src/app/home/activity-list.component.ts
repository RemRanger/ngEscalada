import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';
import { IActivity, ActivityGroup } from './activity';

@Component({
  selector: 'esc-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit
{
  activities: IActivity[] = [];
  errorMessage = '';

  constructor(private activityService: ActivityService) { }

  ngOnInit()
  {
    this.activityService.getActivities().subscribe
      (
        activities => this.activities = activities,
        error => this.errorMessage = <any>error
      );
  }

  getActivityGroups(): ActivityGroup[]
  {
    let activityGroups: ActivityGroup[] = [];
    let lastSessionId: number = null
    let activityGroup: ActivityGroup;
    for (let activity of this.activities.sort((a, b) => { return b.sessionId - a.sessionId }))
    {
      if (activityGroup == null  || lastSessionId == null || activity.sessionId != lastSessionId)
      {
        activityGroup = new ActivityGroup()
        activityGroup.sessionId = activity.sessionId;
        activityGroup.userId = activity.userId;
        activityGroups.push(activityGroup);
      }
      activityGroup.activities.push(activity);

      lastSessionId = activity.sessionId;
    }
    return activityGroups;
  }

  getResultPic(result: number): string
  {
    switch (result)
    {
      case 0: return "result-fail.png";
      case 1: return "result-faults.png";
      case 2: return "result-success.png";
      default: return null;
    }
  }
}
