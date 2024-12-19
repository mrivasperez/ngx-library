import { Component } from '@angular/core';
import { ISBNSearchResult, OpenlibraryService } from './openlibrary.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'library';
  constructor(private openlibrary: OpenlibraryService) {}

  bookInfo: undefined | ISBNSearchResult = undefined;
  loading: boolean = false;
  isbn = new FormControl('');
  error: undefined | string = undefined;

  handleFetchBookData(event: Event) {
    event.preventDefault();

    if (this.isbn.value?.length !== 13) {
      return alert('ISBN number required');
    }

    this.loading = true;
    this.openlibrary.searchByISBN(this.isbn.value).subscribe({
      next: (data) => {
        this.bookInfo = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Something went wrong.';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
