import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface myData {
  message: string,
  user: any,
  success: boolean,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serviceUrl = "http://localhost/blogger/";
  errorData = {};
  redirectUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  authenticate(email: string, password: string) {
    return this.http.post<myData>(`${this.serviceUrl}api/login`, {email: email, password: password}, this.httpOptions)
    .pipe(
    //   map(user => {
    //   if(user) {
    //     localStorage.setItem('currentUser', email);
    //   }
    // }),
    catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if(localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  setLoggedInUser(user: myData) {
    if(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+ `body was: ${error.error}`);
    }

    this.errorData = {
      errorTitle: 'Oops something went wrong',
      errorDesc: 'Please fix the error asap.'
    }
    return throwError(this.errorData);
  }

}
