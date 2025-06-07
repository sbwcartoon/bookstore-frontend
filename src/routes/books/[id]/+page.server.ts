import type {Book} from "$lib/types/book";
import {redirect} from "@sveltejs/kit";
import {httpStatus} from "$lib/status";

export const load = async ({params}) => {
  const id = params.id;
  const response = await fetch(`http://localhost:8080/api/books/${id}`);

  if (!response.ok) {
    throw redirect(httpStatus.TEMPORARY_REDIRECT, "/books");
  }

  const book: Book = await response.json();
  return {book};
};
