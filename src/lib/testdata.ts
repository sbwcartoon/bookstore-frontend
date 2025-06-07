import type {Book} from "$lib/types/book";
import {isBlank} from "$lib/util/validation";

const books: Book[] = Array.from({ length: 47 }, (_, i) => (
  { id: `blah${i + 1}`, title: `The Pragmatic Programmer ${i + 1}`, author: "Andy Hunt", price: 5, quantity: 10, }
));

export function fetchBooks(
  page: number = 1,
  size: number = 10,
  title?: string,
  author?: string,
) {
  const start = (page - 1) * size;
  const filteredBooks = filterBooks(books, title, author);
  const paginatedBooks = filteredBooks.slice(start, start + size);
  const totalPages = Math.ceil(filteredBooks.length / size);
  return { books: paginatedBooks, page, totalPages };
}

function filterBooks(books: Book[], title?: string, author?: string,) {
  return books.filter((book) => {
    const matchesTitle = isBlank(title) || (title && book.title.toLowerCase().includes(title.toLowerCase()));
    const matchesAuthor = isBlank(author) || (author && book.author.toLowerCase().includes(author.toLowerCase()));
    return matchesTitle && matchesAuthor;
  });
}

export function getBookById(id: string) {
  return books.find((book) => book.id === id);
}

export function updateBook(updated: Book) {
  const index = books.findIndex((book) => book.id === updated.id);
  if (index !== -1) {
    books[index] = {...updated};
  }
}

export function deleteBook(id: string) {
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
  }
}
