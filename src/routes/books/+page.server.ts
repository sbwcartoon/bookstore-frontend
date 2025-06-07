import type {PageResponse} from "$lib/types/PageResponse";
import type {BookSummary} from "$lib/types/BookSummary";

export const load = async ({url}) => {
  const page = Number(url.searchParams.get("page") ?? "1");
  const size = 10
  const title = url.searchParams.get("title") ?? "";
  const author = url.searchParams.get("author") ?? "";

  const params = new URL("http://dummy");
  params.searchParams.set("page", String(page));
  params.searchParams.set("size", String(size));
  title && params.searchParams.set("title", title);
  author && params.searchParams.set("author", author);

  const response = await fetch(`http://localhost:8080/api/books${params.search}`);

  const pageResponse: PageResponse = await response.json();
  const books: BookSummary[] = pageResponse.content;
  const totalPages: number = pageResponse.totalPages;

  return {
    books,
    page,
    totalPages,
    filters: {title, author}
  };
};
