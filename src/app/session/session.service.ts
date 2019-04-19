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
  apiUrlCreate = Utils.getApiUrl('session', apiKind.create);
  apiUrlUpdate = Utils.getApiUrl('session', apiKind.update);
  apiUrlDelete = Utils.getApiUrl('session', apiKind.delete);

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

  getSingleSession(id: number): Observable<Session[] | undefined>
  {
    if (id != null)
    {
      let params = new HttpParams().set('id', id.toString());
      return this.http.get<Session[]>(this.apiUrlRead, { params: params }).pipe
        (
          //tap(data => console.log('Sessions: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  }

  saveSession(session: Session, userId: number): Observable<Session | undefined>
  {
    let body = new FormData();
    body.append('comment', session.comment);
    body.append('date', session.date.toISOString());
    body.append('locationId', session.locationId.toString());
    for (var i = 0; i < session.partnerIds.length; i++)
      body.append('partnerIds[' + i + ']', session.partnerIds[i].toString());
    body.append('userId', userId.toString());

    //console.log("Session: ", session)
    //console.log("User Id: ", userId)
    //console.log("partnerIdsAsString", session.partnerIdsAsString);
    //console.log("partnerIds", session.partnerIds);
    //console.log("body", body);

    if (session.id)
    {
      body.append('id', session.id.toString());
      return this.http.post<any>(this.apiUrlUpdate, body).pipe
        (
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
    else
    {
      return this.http.post<any>(this.apiUrlCreate, body).pipe
        (
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  }

  deleteSession(session: Session): Observable<Session | undefined>
  {
    if (session.id)
    {
      let body = new FormData();
      body.append('id', session.id.toString());

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
