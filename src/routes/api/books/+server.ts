import {addBook} from "$lib/testdata";

export async function POST({request}: { request: Request }) {
  const book = await request.json();
  addBook(book);
  return new Response();
}
