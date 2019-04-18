import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ILocation } from './location';
import { Utils, apiKind } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class LocationService
{
  apiUrlRead = Utils.getApiUrl('locations', apiKind.read);

  constructor(private http: HttpClient) { }

  getLocations(): Observable<ILocation[]>
  {
    return this.http.get<ILocation[]>(this.apiUrlRead).pipe(
      //tap(data => console.log('Locations: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getLocation(id: number): Observable<ILocation | undefined>
  {
    return this.getLocations().pipe(
      map((locations: ILocation[]) => locations.find(p => p.id === id))
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
  }
}
