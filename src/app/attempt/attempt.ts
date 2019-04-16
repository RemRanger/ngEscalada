export interface IAttempt
{
  id: number;
  result: number;
  percentage: number;
  comment: string;
  routeId: number;
  routeColor: string;
  routeName: string;
  routeType: string;
  routeRating: string;
  routeSublocation: string;
  routeDateUntil: Date;
  routePictureFileName: string;
  locationName: string;
  sessionId: number;
  sessionDate: string;
  userId: number;
  userFirstName: string;
  userLastName: string;
}

export class AttemptGroup
{
  sessionId: number;
  userId: number;
  attempts: IAttempt[] = [];
}
