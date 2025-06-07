import {deleteBook} from "$lib/testdata";
import type {Book} from "$lib/types/book";

export async function PUT({request}: { request: Request }) {
  const book: Book = await request.json();
  return await fetch(`http://localhost:8080/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function DELETE({params}: { params: { id: string } }) {
  deleteBook(params.id);
  return new Response();
}
