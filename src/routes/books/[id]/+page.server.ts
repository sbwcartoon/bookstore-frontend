import {getBookById} from "$lib/testdata";
import type {Book} from "$lib/types/book";
import {redirect} from "@sveltejs/kit";
import {httpStatus} from "$lib/status";

export const load = async ({params}) => {
  const id = params.id;
  const book: Book | undefined = getBookById(id);

  if (book === undefined) {
    throw redirect(httpStatus.TEMPORARY_REDIRECT, "/books");
  }

  return {book};
};
