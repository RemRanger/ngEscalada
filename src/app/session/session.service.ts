import { Injectable } from '@angular/core';
import { Utils, apiKind } from '../shared/utils';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Session } from './session';

@Injectable({ providedIn: 'root' })
export class SessionService
{
  apiUrlRead = Utils.getApiUrl('session', apiKind.read);

  constructor(private http: HttpClient) { }

  getSessions(userId: number): Observable<Session[]>
  {
    if (userId != null)
    {
      let params = new HttpParams().set('userId', userId.toString());
      return this.http.get<Session[]>(this.apiUrlRead, { params: params }).pipe
        (
          //tap(data => console.log('Sessions: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  }

  getSession(id: number, userId: number): Observable<Session | undefined>
  {
    return this.getSessions(userId).pipe(
      map((sessions: Session[]) => sessions.find(p => p.id === id))
    );
  }

  saveSession(session: Session): Observable<Session | undefined>
  {
    let body = new FormData();
    body.append('comment', session.comment);
    body.append('date', session.date.toString());
    body.append('locationId', session.locationId.toString());
    body.append('mateIds', session.partnerIdsAsString);
    if (session.id)
    {
      body.append('id', session.id.toString());
      return this.http.post<any>(this.apiUrlRead, body).pipe
        (
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
    else
    {
      return this.http.put<any>(this.apiUrlRead, body).pipe
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
