import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../user/user';
import { Utils, apiKind } from '../shared/utils';

@Injectable({ providedIn: 'root' })
export class LoginService
{
  apiUrlLoginRead = Utils.getApiUrl('user-login', apiKind.read);
  apiUrlCreate = Utils.getApiUrl('user', apiKind.create);

  constructor(private http: HttpClient) { }

  getUser(userName: string, password: string): Observable<User | undefined>
  {
    let body = new FormData();
    body.append('userName', userName);
    body.append('password', password);
    return this.http.post<any>(this.apiUrlLoginRead, body).pipe
      (
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  appendUser(user: User): Observable<User | undefined>
  {
    let body = new FormData();
    body.append('firstName', user.firstName);
    body.append('lastName', user.lastName);
    body.append('gender', user.gender);
    body.append('email', user.email);
    body.append('password', user.password);
    body.append('userName', user.userName);
    return this.http.post<any>(this.apiUrlCreate, body).pipe
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
