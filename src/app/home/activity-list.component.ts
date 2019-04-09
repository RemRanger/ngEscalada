import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';
import { IActivity, ActivityGroup } from './activity';
import { Utils } from '../shared/utils';

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

  getResultPic(result: number): string { return Utils.getResultPic(result); }
}
