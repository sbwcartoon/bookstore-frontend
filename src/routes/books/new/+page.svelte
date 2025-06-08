<script lang="ts">
  import {goto} from "$app/navigation";
  import type {Book} from "$lib/types/Book";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";
  import {HttpError} from "$lib/exception/HttpError";
  import {httpStatus} from "$lib/status";
  import BookInputForm from "$lib/components/form/BookInputForm.svelte";

  let book: Book = $state({
    title: "",
    author: "",
    price: 0,
    quantity: 0,
  });

  let titleValid = $derived(isNotBlank(book.title));
  let authorValid = $derived(isNotBlank(book.author));
  let priceValid = $derived(isPositiveNaturalNumber(book.price));
  let quantityValid = $derived(isPositiveNaturalNumber(book.quantity));
  let bookValid = $derived(titleValid && authorValid && priceValid && quantityValid);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!bookValid) {
      alert("입력 정보를 확인해주세요.");
      throw new ValidationError();
    }
    const response = await fetch("/api/books", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      if (response.status === httpStatus.CONFLICT) {
        alert("동일한 저자가 쓴 같은 제목의 책이 이미 존재합니다. 다른 내용으로 다시 시도해주세요.");
        throw await HttpError.fromResponse(response);
      }

      if (response.status === httpStatus.BAD_REQUEST) {
        alert("입력한 내용이 유효하지 않습니다. 올바르게 입력한 후 다시 시도해주세요.");
        throw await HttpError.fromResponse(response);
      }

      alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
      throw await HttpError.fromResponse(response);
    }

    alert("저장되었습니다.");
    await goto("/books");
  }
</script>

<h1 class="text-xl font-bold mb-4">📖 새 책 추가</h1>

<form onsubmit={handleSubmit} class="space-y-10">
  <BookInputForm bind:book/>

  <div class="flex justify-between items-center">
    <button
      type="button"
      class="bg-gray-500 text-white px-4 py-2 rounded"
    >
      <a href="/books">목록으로</a>
    </button>
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      저장
    </button>
  </div>
</form>
