import { Route, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { BookSearchComponent } from './pages/book-search/book-search.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { ScanComponent } from './pages/scan/scan.component';

export interface AppRoute extends Route {
  title: string;
  data?: {
    /**
     * Whether to show this route in the navbar
     * @type {boolean | undefined}
     * @default undefined
     * @example
     * ```ts
     * data: {
     *  showInNavbar: true,
     * }
     */
    showInNavbar?: boolean;
  };
}

export const routes: AppRoute[] = [
  {
    title: 'Library',
    path: '',
    component: ListComponent,
  },
  {
    title: 'Add Book',
    path: 'search',
    component: BookSearchComponent,
  },
  {
    title: 'Book Details',
    path: 'books/:isbn',
    component: BookDetailsComponent,
  },
  {
    title: 'Scan',
    path: 'scan',
    component: ScanComponent,
  },
];
