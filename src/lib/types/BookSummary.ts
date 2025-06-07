import type {Book} from "$lib/types/Book";

export type BookSummary = Omit<Book, "price"> & {
  id: string;
}
