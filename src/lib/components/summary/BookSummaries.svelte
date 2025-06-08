<script>
  import BookSummary from "$lib/components/summary/BookSummary.svelte";

  const {data} = $props();
</script>

<ul class="space-y-2">
  {#each data.books as book (book.id)}
    <BookSummary {book} />
  {/each}
</ul>
