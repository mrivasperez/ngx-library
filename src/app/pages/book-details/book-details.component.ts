import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/types';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  isbn: string = '';
  bookDetails: Book | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private books: BookService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.isbn = decodeURIComponent(String(params.get('isbn')));
      this.bookDetails = this.books.getBook(this.isbn);
    });
  }

  handleDeleteBook() {
    if (this.bookDetails) {
      this.books.deleteBook(this.bookDetails.isbn);
      return this.router.navigate(['/']);
    } else return;
  }

  handleFavoriteBook() {
    if (!this.bookDetails) return;
    if (this.bookDetails?.isFavorite) {
      this.books.updateBook({ ...this.bookDetails, isFavorite: false });
      return (this.bookDetails.isFavorite = false);
    } else {
      this.books.updateBook({ ...this.bookDetails, isFavorite: true });
      return (this.bookDetails.isFavorite = true);
    }
  }
}
