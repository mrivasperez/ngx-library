import { Component, OnInit } from '@angular/core';
import { Book } from '../../shared/types';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  bookList: Book[] = [];

  constructor(private books: BookService) {}

  ngOnInit(): void {
    this.bookList = this.books.getAllBooks();
  }
}
