<script lang="ts">
  import {goto} from "$app/navigation";
  import type {Book} from "$lib/types/book";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";

  const {data} = $props();
  const book: Book = $state(data.book);

  let titleValid = $derived(() => isNotBlank(book.title));
  let authorValid = $derived(() => isNotBlank(book.author));
  let priceValid = $derived(() => isPositiveNaturalNumber(book.price));
  let quantityValid = $derived(() => isPositiveNaturalNumber(book.quantity));
  let bookValid = $derived(() => titleValid() && authorValid() && priceValid() && quantityValid());

  async function handleUpdate(e: Event) {
    e.preventDefault();
    if (!bookValid()) {
      alert("입력 정보를 확인해주세요.");
      throw new ValidationError();
    }
    await fetch(`/api/books/${book.id}`, {
      method: "put",
      body: JSON.stringify(book),
    });
    alert("수정되었습니다.");
  }

  async function handleDelete(e: Event) {
    e.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      await fetch(`/api/books/${book.id}`, {
        method: "delete",
      });
      alert("삭제되었습니다.");
      await goto("/books");
    }
  }
</script>

<h1 class="text-xl font-bold mb-4">✏️ 책 상세 정보</h1>

<form onsubmit={handleUpdate} class="space-y-4">
  <input bind:value={book.title} placeholder="제목" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input bind:value={book.author} placeholder="저자" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input type="number" bind:value={book.price} min="0" step="1" placeholder="가격" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input type="number" bind:value={book.quantity} min="0" step="1" placeholder="수량" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <button type="button"><a href="/books" class="bg-gray-500 text-white px-4 py-2 rounded">목록으로</a></button>
  <button
    type="button"
    class="bg-red-400 text-white px-4 py-2 rounded"
    onclick={handleDelete}
  >삭제
  </button>
  <button
    type="submit"
    class="bg-green-500 text-white px-4 py-2 rounded"
  >수정
  </button>
</form>
