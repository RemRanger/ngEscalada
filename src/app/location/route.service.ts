import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRoute } from './route';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouteService
{
  private locationUrl = 'http://www.remranger.com/escalada/rest/routes.php';

  constructor(private http: HttpClient) { }

  //getLocations(locationId: number): Observable<IRoute[]>
  //{
  //  return this.http.get<IRoute[]>(`{this.locationUrl}?IdLocation=${locationId}`).pipe(
  //    tap(data => console.log('All: ' + JSON.stringify(data))),
  //    catchError(this.handleError)
  //  );
  //}
  getRoutes(locationId: number): Observable<IRoute[]>
  {
    let url: string = this.locationUrl + '?IdLocation=' + locationId;
    return this.http.get<IRoute[]>(url).pipe
    (
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse)
  {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent)
    {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else
    {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }}
