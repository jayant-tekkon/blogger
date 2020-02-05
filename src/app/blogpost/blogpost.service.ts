import { Injectable } from '@angular/core';
import { Blogpost } from './blogpost';
import { Category } from './category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  ServiceUrl = 'http://localhost/blogger/';
  errorData = {};

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get<Blogpost>(this.ServiceUrl + 'api/blog').pipe(
      catchError(this.handleError)
    );
  }

  getBlogDetail(id: number) {
    return this.http.get<Blogpost>(this.ServiceUrl + 'api/blog/' + id).pipe(
      catchError(this.handleError)
    );
  }

  getRecentBlogs() {
    return this.http.get<Blogpost>(this.ServiceUrl + 'api/blog/recent').pipe(
      catchError(this.handleError)
    );
  }

  getCategories() {
    return this.http.get<Category>(this.ServiceUrl + '/api/category').pipe(
      catchError(this.handleError)
    );
  }

  createBlog(blog) {
    return this.http.post<any>(this.ServiceUrl + 'api/blog', blog).pipe(catchError(this.handleError));
  }

  updateBlog(blog, id: number) {
    return this.http.post<any>(this.ServiceUrl + 'api/blog/update/' + id, blog).pipe(catchError(this.handleError));
  }

  deleteBlog(id: number) {
    return this.http.get<any>(this.ServiceUrl + 'api/blog/delete/' + id).pipe(catchError(this.handleError));
  }

  getCategoryDetail(id: number) {
    return this.http.get<any>(this.ServiceUrl + 'api/category/' +id).pipe(catchError(this.handleError));
  }

  createCategory(category) {
    return this.http.post<any>(this.ServiceUrl + 'api/category', category).pipe(catchError(this.handleError));
  }

  updateCategory(category, id:number) {
    return this.http.post<any>(this.ServiceUrl + 'api/category/update/' + id, category).pipe(catchError(this.handleError));
  }

  deleteCategory(id:number) {
    return this.http.get<any>(this.ServiceUrl + 'api/category/delete/' +id).pipe(catchError(this.handleError));
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
