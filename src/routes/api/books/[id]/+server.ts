import {deleteBook, updateBook} from "$lib/testdata";

export async function PUT({request}: { request: Request }) {
  const book = await request.json();
  updateBook(book);
  return new Response();
}

export async function DELETE({params}: { params: { id: string } }) {
  deleteBook(params.id);
  return new Response();
}
