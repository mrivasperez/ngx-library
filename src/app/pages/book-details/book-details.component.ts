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
  bookDetails: Book | undefined = undefined;
  constructor(
    private route: ActivatedRoute,
    private books: BookService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const isbn = decodeURIComponent(String(params.get('isbn')));
      this.bookDetails = this.books.getBook(isbn);
    });
  }

  handleDeleteBook() {
    if (this.bookDetails) {
      this.books.deleteBook(this.bookDetails.isbn);
      return this.router.navigate(['/']);
    }
    else return;
  }
}
