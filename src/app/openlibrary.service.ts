import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ISBNSearchResult {
  publishers: string[];
  subtitle: string;
  title: string;
  number_of_pages: number;
  publish_date: string;
  authors: { key: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://openlibrary.org';

  public searchByISBN(isbn: string) {
    return this.http.get(
      `${this.baseUrl}/isbn/${isbn}.json`
    ) as Observable<ISBNSearchResult>;
  }
}
