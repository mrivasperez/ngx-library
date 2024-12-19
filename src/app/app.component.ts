import { Component } from '@angular/core';
import {
  AuthorSearchResult,
  ISBNSearchResult,
  OpenlibraryService,
} from './openlibrary.service';
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
  authorInfo: undefined | AuthorSearchResult = undefined;
  loading: boolean = false;
  isbn = new FormControl('9781680507225');
  error: undefined | string = undefined;
  bookCoverImgUrl = `https://covers.openlibrary.org/b/isbn/${this.isbn.value}-M.jpg`;

  handleFetchBookData(event: Event) {
    event.preventDefault();

    if (this.isbn.value?.length !== 13) {
      return alert('ISBN number required');
    }

    this.loading = true;

    this.openlibrary.searchByISBN(this.isbn.value).subscribe({
      next: (data) => {
        console.log(data);
        this.bookInfo = data;
        this.loading = false;
        // load author info
        this.openlibrary
          .searchAuthor(data.authors[0].key)
          .subscribe((res) => (this.authorInfo = res));
      },
      error: () => {
        this.error = 'Something went wrong.';
        this.bookInfo = undefined;
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
