<script lang="ts">
  import {isNotBlank} from "$lib/util/validation";
  import {goto} from "$app/navigation";

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

<h1 class="text-2xl font-bold mb-4">📚 책 목록 - 페이지 {data.page}</h1>

<a href="/books/new" class="text-blue-500 underline mb-4 inline-block">+ 새 책 추가</a>

<form onsubmit={applyFilters} class="flex gap-4 items-center">
  <div>
    <label class="block text-sm">
      제목
      <input type="text" bind:value={title} class="input input-bordered w-full"/>
    </label>
  </div>
  <div>
    <label class="block text-sm">
      저자
      <input type="text" bind:value={author} class="input input-bordered w-full"/>
    </label>
  </div>
  <button type="submit" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">검색</button>
</form>

<ul class="space-y-2">
  {#each data.books as book (book.id)}
    <li class="p-4 bg-white shadow rounded">
      <a href={`/books/${book.id}`}>
        <div class="font-semibold">{book.title}</div>
        <div class="text-sm text-gray-600">{book.author}</div>
        <div class="text-sm text-gray-600">{book.quantity}</div>
      </a>
    </li>
  {/each}
</ul>

<div class="flex justify-center space-x-2">
  {#if data.page > 1}
    <a href="?{buildQuery(data.page - 1)}" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← 이전</a>
  {/if}

  {#each Array(data.totalPages) as _, i}
    <a
      href="?{buildQuery(i + 1)}"
      class={`px-3 py-1 rounded ${data.page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
    >
      {i + 1}
    </a>
  {/each}

  {#if data.page < data.totalPages}
    <a href="?{buildQuery(data.page + 1)}" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">다음 →</a>
  {/if}
</div>
