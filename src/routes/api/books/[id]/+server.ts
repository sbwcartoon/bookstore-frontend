import type {BookDetail} from "$lib/types/BookDetail";
import {PUBLIC_API_HOST_URL} from "$env/static/public";

export async function PUT({request}: { request: Request }) {
  const book: BookDetail = await request.json();
  return await fetch(`${PUBLIC_API_HOST_URL}/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
}

export async function DELETE({params}: { params: { id: string } }) {
  return await fetch(`${PUBLIC_API_HOST_URL}/api/books/${params.id}`, {
    method: "DELETE",
  });
}
