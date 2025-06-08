<script lang="ts">
  import {isNotBlank} from "$lib/util/validation";
  import {goto} from "$app/navigation";
  import Pagination from "$lib/components/pagination/Pagination.svelte";
  import BookSummaries from "$lib/components/summary/BookSummaries.svelte";
  import SearchFilter from "$lib/components/searchfilter/SearchFilter.svelte";

  const {data} = $props();

  let title = $state(data.filters.title);
  let author = $state(data.filters.author);

  function applyFilters(e: Event) {
    e.preventDefault();
    goToPage(1);
  }

  export function buildQuery(page: number) {
    const params = new URLSearchParams();

    if (isNotBlank(title)) {
      params.set("title", title.trim());
    }

    if (isNotBlank(author)) {
      params.set("author", author.trim());
    }

    params.set("page", String(page));

    return params.toString();
  }

  export function goToPage(page: number) {
    goto(`/books?${buildQuery(page)}`);
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex justify-center items-center gap-5 w-full">
    <a href="/books/new"
       class="flex justify-center items-center whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded">+ 새 책 추가</a>

    <form onsubmit={applyFilters} class="w-full">
      <SearchFilter
        bind:title
        bind:author
      />
    </form>
  </div>

  <div>
    <BookSummaries {data}/>
    <Pagination {data} {buildQuery}/>
  </div>
</div>
