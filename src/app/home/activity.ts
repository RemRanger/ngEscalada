export interface IActivity
{
  routeId: number;
  routeName: string;
  type: string;
  rating: string;
  color: string;
  dateUntil: Date;
  result: number;
  percentage: number;
  locationName: string;
  subLocation: string;
  firstName: string;
  lastName: string;
  sessionDate: number;
  sessionId: number;
  userId: number;
  pictureFileName: string;
}

export class ActivityGroup
{
  sessionId: number;
  userId: number;
  activities: IActivity[] = [];
}
