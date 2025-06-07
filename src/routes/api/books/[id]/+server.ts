import type {BookDetail} from "$lib/types/BookDetail";

export async function PUT({request}: { request: Request }) {
  const book: BookDetail = await request.json();
  return await fetch(`http://localhost:8080/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function DELETE({params}: { params: { id: string } }) {
  return await fetch(`http://localhost:8080/api/books/${params.id}`, {
    method: "DELETE",
  });
}
