import { Component, OnInit } from '@angular/core';
import {
  AuthorSearchResult,
  ISBNSearchResult,
  OpenlibraryService,
} from './openlibrary.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../shared/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-search',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent implements OnInit {
  constructor(
    private openlibrary: OpenlibraryService,
    private books: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  bookInfo: undefined | ISBNSearchResult = undefined;
  authorInfo: undefined | AuthorSearchResult = undefined;
  loading: boolean = false;
  isbn = new FormControl('');
  error: undefined | string = undefined;
  bookCoverImgUrl = `https://covers.openlibrary.org/b/isbn/${this.isbn.value}-M.jpg`;
  isBookInLibrary: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const isbnFromParams = params['isbn'];
      if (isbnFromParams) {
        this.isbn.setValue(isbnFromParams);
        this.handleFetchBookData();
      }
    });

    this.isbn.valueChanges.subscribe((value) => {
      if (value && value.length === 13) {
        this.handleFetchBookData();
      }
    });
  }

  handleFetchBookData(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if (this.isbn.value?.length !== 13) {
      return alert('ISBN number required');
    }
    this.loading = true;

    if (this.books.isBookInLibrary(this.isbn.value))
      this.isBookInLibrary = true;
    else this.isBookInLibrary = false;

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
        console.log(data);
        this.bookInfo = data;
        this.loading = false;
        // load author info
        if (data.authors)
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

  handleAddToLibrary() {
    if (this.bookInfo && this.authorInfo || this.bookInfo && !this.bookInfo.authors) {
      this.books.addBook({
        isbn: String(this.isbn.value),
        title: this.bookInfo.title,
        author: this.authorInfo?.name || "Author",
        addedDate: new Date(),
        coverUrl: this.bookCoverImgUrl,
        subtitle: this.bookInfo.subtitle,
        publishDate: this.bookInfo.publish_date,
      });

      this.isBookInLibrary = true;

      return this.router.navigate([`books/${this.isbn.value}`]);
    } else return;
  }
}
