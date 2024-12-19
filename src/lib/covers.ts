export const fetchBookCover = (isbn: string) => {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
};
