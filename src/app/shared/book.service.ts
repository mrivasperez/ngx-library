import { Injectable } from '@angular/core';
import { Book } from './types';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'bookLibrary';

  addBook(book: Book) {
    localStorage.setItem(this.localStorageKey, JSON.stringify([book]));
    console.log(book)
  }
}
