import {fetchBooks} from "$lib/testdata";

export const load = async ({url}) => {
  const page = Number(url.searchParams.get("page") ?? "1");
  const size = 10
  const title = url.searchParams.get("title") ?? "";
  const author = url.searchParams.get("author") ?? "";

  const { books, totalPages } = fetchBooks(page, size, title, author);

  return {
    books,
    page,
    totalPages,
    filters: { title, author }
  };
};
