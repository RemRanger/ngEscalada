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
}
