import { Injectable } from '@angular/core';
import { Book } from './types';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'bookLibrary';

  getAllBooks(): Book[] {
    const storedBooks = localStorage.getItem(this.localStorageKey);
    return storedBooks ? JSON.parse(storedBooks) : [];
  }

  addBook(book: Book) {
    const books = this.getAllBooks();
    // Don't add if book exists
    if (this.isBookInLibrary(book.isbn)) {
      console.warn(`Book with ISBN ${book.isbn} already exists in library.`);
      return;
    }
    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify([...books, book])
    );
    console.log(book);
  }

  getBook(isbn: string): Book | undefined {
    return this.getAllBooks().find((book) => book.isbn === isbn);
  }

  updateBook(book: Book): void {
    const books = this.getAllBooks();
    const updatedBooks = books.map((b) => {
      if (b.isbn === book.isbn) {
        return book;
      }
      return b;
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(updatedBooks));
  }

  deleteBook(isbn: string): void {
    const books = this.getAllBooks().filter((book) => book.isbn !== isbn);
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }

  isBookInLibrary(isbn: string): boolean {
    return !!this.getBook(isbn);
  }
}
