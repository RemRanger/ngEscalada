import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Utils, apiKind } from '../shared/utils';
import { Observable, throwError } from 'rxjs';
import { Attempt } from './attempt';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AttemptService
{
  apiUrlRead = Utils.getApiUrl('attempt', apiKind.read);
  apiUrlCreate = Utils.getApiUrl('attempt', apiKind.create);
  apiUrlUpdate = Utils.getApiUrl('attempt', apiKind.update);
  apiUrlDelete = Utils.getApiUrl('attempt', apiKind.delete);

  constructor(private http: HttpClient) { }

  getAllAttempts(): Observable<Attempt[]>
  {
    return this.http.get<Attempt[]>(this.apiUrlRead).pipe
      (
        tap(data => console.log('Attempts: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAttempts(sessionId: number, userId: number): Observable<Attempt[]>
  {
    let params = new HttpParams().set('sessionId', sessionId.toString()).set('userId', userId.toString());
    return this.http.get<Attempt[]>(this.apiUrlRead, { params: params }).pipe
      (
        tap(data => console.log('Attempts: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAttempt(id: number): Observable<Attempt[] | undefined>
  {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<Attempt[]>(this.apiUrlRead, { params: params }).pipe
      (
        tap(data => console.log('Attempts: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  saveAttempt(attempt: Attempt): Observable<Attempt | undefined>
  {
    let body = new FormData();
    body.append('userId', attempt.userId.toString());
    body.append('sessionId', attempt.sessionId.toString());
    body.append('routeId', attempt.routeId.toString());
    body.append('comment', attempt.comment);
    body.append('result', attempt.result.toString());
    body.append('percentage', attempt.percentage.toString());

    if (attempt.id)
    {
      body.append('id', attempt.id.toString());
      return this.http.post<any>(this.apiUrlUpdate, body).pipe
        (
          tap(data => console.log('Update attempt: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
    else
    {
      return this.http.post<any>(this.apiUrlCreate, body).pipe
        (
          tap(data => console.log('Create attempt: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  }

  deleteAttempt(attempt: Attempt): Observable<Attempt | undefined>
  {
    if (attempt.id)
    {
      let body = new FormData();
      body.append('id', attempt.id.toString());

      console.log("body", body);

      return this.http.post<any>(this.apiUrlDelete, body).pipe
        (
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
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
