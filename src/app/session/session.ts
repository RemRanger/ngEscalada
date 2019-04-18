export class Session
{
  id: number;
  comment: string;
  date: Date;
  locationId: number;
  locationName: string;
  partnerNames: string;
  partnerIdsAsString: string;
  partnerIds: number[] = [];
}
