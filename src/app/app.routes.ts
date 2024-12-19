import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { BookSearchComponent } from './pages/book-search/book-search.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'search', component: BookSearchComponent },
];
