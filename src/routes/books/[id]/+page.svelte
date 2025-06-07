<script lang="ts">
  import {goto} from "$app/navigation";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";
  import {httpStatus} from "$lib/status";
  import {HttpError} from "$lib/exception/HttpError";
  import type {BookDetail} from "$lib/types/BookDetail";

  const {data} = $props();
  const book: BookDetail = $state(data.book);

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
    const response = await fetch(`/api/books/${book.id}`, {
      method: "put",
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

      if (response.status === httpStatus.NOT_FOUND) {
        alert("책이 존재하지 않습니다. 저장된 책을 수정해 주세요.");
        throw await HttpError.fromResponse(response);
      }

      alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
      throw await HttpError.fromResponse(response);
    }

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
