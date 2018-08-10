import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    this.httpClient.post('pep-api/auth/login', {username: username, password: password}, httpOptions)
    .pipe(
      map((response: Response) => {
        return <any>response.body;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return throwError(errorResponse.error);
      })
    ).subscribe((res: any) => {
      console.log(res);
    });
  }
}
