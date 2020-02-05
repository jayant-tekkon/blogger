import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class CmspageService {

  ServiceUrl = 'http://localhost/blogger/';
  errorData = {};

  constructor(private http: HttpClient) { }

  contactForm(formdata: Contact) {
    return this.http.post<Contact>(this.ServiceUrl + 'api/contact', formdata).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+ `body was: ${error.error.message}`);
    }

    this.errorData = {
      errorTitle: 'Oops something went wrong',
      errorDesc: 'Please fix the error asap.'
    }
    return throwError(this.errorData);
  }
}
