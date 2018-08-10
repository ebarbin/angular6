import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CustomResponse } from '../shared/custom-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {

    const httpOptions = {
      headers: new HttpHeaders({
       'Authorization': 'acaaca'
      }),
      withCredentials: true
     };

    this.httpClient.post('pep-api/user/register', {username: username, password: password}, httpOptions)
    .pipe(
      map((response: CustomResponse) => {
        return <User> response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((user: User) => {
      console.log(user);
    });
  }
}
