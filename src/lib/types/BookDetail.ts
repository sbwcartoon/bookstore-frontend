import type {Book} from "$lib/types/book";

export type BookDetail = Omit<Book, "id"> & {
  id: string;
}
