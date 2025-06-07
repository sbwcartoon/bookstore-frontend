import type {BookSummary} from "$lib/types/BookSummary";

export interface PageResponse {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
  content: BookSummary[]
}
