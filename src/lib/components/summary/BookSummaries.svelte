<script lang="ts">
  import BookSummaryItem from "$lib/components/summary/BookSummaryItem.svelte";
  import type {BookSummary} from "$lib/types/BookSummary";

  const {data}: { data: { books: BookSummary[] } } = $props();
</script>

<ul class="space-y-2">
  {#each data.books as book (book.id)}
    <BookSummaryItem {book}/>
  {/each}
</ul>
