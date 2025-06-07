import {redirect} from "@sveltejs/kit";
import {httpStatus} from "$lib/status";
import type {BookDetail} from "$lib/types/BookDetail";
import {PUBLIC_API_HOST_URL} from "$env/static/public";

export const load = async ({params}) => {
  const id = params.id;
  const response = await fetch(`${PUBLIC_API_HOST_URL}/api/books/${id}`);

  if (!response.ok) {
    throw redirect(httpStatus.TEMPORARY_REDIRECT, "/books");
  }

  const book: BookDetail = await response.json();
  return {book};
};
