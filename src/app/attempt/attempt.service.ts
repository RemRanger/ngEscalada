import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';
import { Observable, throwError } from 'rxjs';
import { IAttempt } from './attempt';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AttemptService
{
  private apiUrl = Utils.getApiUrl('attempts');

  constructor(private http: HttpClient) { }

  getAttempts(sessionId: number, userId: number): Observable<IAttempt[]>
  {
    let params = new HttpParams().set('sessionId', sessionId.toString()).set('userId', userId.toString());
    return this.http.get<IAttempt[]>(this.apiUrl, { params: params }).pipe
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
  }
}
