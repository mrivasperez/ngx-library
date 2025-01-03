import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { BookSearchComponent } from './pages/book-search/book-search.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { ScanComponent } from './pages/scan/scan.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'search', component: BookSearchComponent },
  { path: 'books/:isbn', component: BookDetailsComponent },
  { path: 'scan', component: ScanComponent },
];
