export interface Book {
  isbn: string;
  title: string;
  author: string;
  coverUrl?: string;
  publishDate?: string;
  pageCount?: number;
  notes?: string;
  addedDate: Date;
  isFavorite?: boolean;
  subtitle?: string;
}