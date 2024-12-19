import { Component } from '@angular/core';
import { BookSearchComponent } from './pages/book-search/book-search.component';

@Component({
  selector: 'app-root',
  imports: [BookSearchComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'library';
}
