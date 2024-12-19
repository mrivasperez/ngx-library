export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl?: string;
  publisher?: string;
  publishDate?: string;
  pageCount?: number;
  notes?: string;
  status: 'read' | 'reading' | 'to-read';
  addedDate: Date;
  isFavorite?: boolean;
}