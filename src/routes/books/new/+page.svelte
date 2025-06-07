<script lang="ts">
  import {goto} from "$app/navigation";
  import type {Book} from "$lib/types/book";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";

  const book: Book = $state({
    title: "",
    author: "",
    price: 0,
    quantity: 0,
  });

  let titleValid = $derived(() => isNotBlank(book.title));
  let authorValid = $derived(() => isNotBlank(book.author));
  let priceValid = $derived(() => isPositiveNaturalNumber(book.price));
  let quantityValid = $derived(() => isPositiveNaturalNumber(book.quantity));
  let bookValid = $derived(() => titleValid() && authorValid() && priceValid() && quantityValid());

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!bookValid()) {
      alert("입력 정보를 확인해주세요.");
      throw new ValidationError();
    }
    await fetch("/api/books", {
      method: "post",
      body: JSON.stringify(book),
    });
    alert("저장되었습니다.");
    await goto("/books");
  }
</script>

<h1 class="text-xl font-bold mb-4">📖 새 책 추가</h1>

<form onsubmit={handleSubmit} class="space-y-4">
  <input bind:value={book.title} placeholder="제목" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input bind:value={book.author} placeholder="저자" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input type="number" bind:value={book.price} min="0" step="1" placeholder="가격" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <input type="number" bind:value={book.quantity} min="0" step="1" placeholder="수량" class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  <button type="button"><a href="/books" class="bg-gray-500 text-white px-4 py-2 rounded">목록으로</a></button>
  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">저장</button>
</form>
