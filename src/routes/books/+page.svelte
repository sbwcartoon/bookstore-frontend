<script lang="ts">
  import {isNotBlank} from "$lib/util/validation";
  import {goto} from "$app/navigation";
  import Pagination from "$lib/components/pagination/Pagination.svelte";

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
      <div class="flex justify-center items-center gap-1.5">
        <input type="text" bind:value={title} class="form-input w-full" placeholder="제목"/>
        <input type="text" bind:value={author} class="form-input w-full" placeholder="저자"/>
        <button type="submit" class="px-10 py-2 whitespace-nowrap bg-black hover:bg-gray-900 text-white rounded">검색
        </button>
      </div>
    </form>
  </div>

  <div>
    <ul class="space-y-2">
      {#each data.books as book (book.id)}
        <li class="p-4 bg-white shadow rounded">
          <a href={`/books/${book.id}`}>
            <div class="font-semibold">{book.title}</div>
            <div class="text-sm text-gray-600">{book.author}</div>
            <div class="text-sm text-gray-600">{book.quantity} 권</div>
          </a>
        </li>
      {/each}
    </ul>

    <Pagination {data} {buildQuery}/>
  </div>
</div>
