import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';
import { Utils, apiKind } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class UserService
{
  apiUrlRead = Utils.getApiUrl('user', apiKind.read);

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.apiUrlRead).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User | undefined>
  {
    return this.getUsers().pipe(
      map((climbers: User[]) => climbers.find(p => p.id === id))
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
