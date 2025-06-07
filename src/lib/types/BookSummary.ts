import type {Book} from "$lib/types/book";

export type BookSummary = Omit<Book, "id" | "price"> & {
  id: string;
}
