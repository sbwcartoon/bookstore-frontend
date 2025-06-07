import type {Book} from "$lib/types/book";

const books: Book[] = Array.from({ length: 47 }, (_, i) => (
  { id: `blah${i + 1}`, title: `The Pragmatic Programmer ${i + 1}`, author: "Andy Hunt", price: 5, quantity: 10, }
));

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
