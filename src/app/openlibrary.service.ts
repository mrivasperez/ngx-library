import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISBNSearchResult {}

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://openlibrary.org';

  public searchByISBN(
    isbn: string = '9781680507225'
  ): Observable<ISBNSearchResult> {
    return this.http.get(`${this.baseUrl}/isbn/${isbn}.json`);
  }
}
