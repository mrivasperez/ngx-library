import { Component } from '@angular/core';
import {
  AuthorSearchResult,
  ISBNSearchResult,
  OpenlibraryService,
} from '../../openlibrary.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent {
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
        this.error = undefined;
        if (!data.covers) {
          // TODO choose better placeholder
          this.bookCoverImgUrl =
            'https://images.unsplash.com/photo-1529590003495-b2646e2718bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8fDA%3D';
        } else {
          this.bookCoverImgUrl = `https://covers.openlibrary.org/b/isbn/${this.isbn.value}-M.jpg`;
        }
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
