<script lang="ts">
  import {goto} from "$app/navigation";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";
  import {httpStatus} from "$lib/status";
  import {HttpError} from "$lib/exception/HttpError";
  import type {BookDetail} from "$lib/types/BookDetail";
  import BookInputForm from "$lib/components/form/BookInputForm.svelte";

  const {data} = $props();
  let book: BookDetail = $state(data.book);

  let titleValid = $derived(isNotBlank(book.title));
  let authorValid = $derived(isNotBlank(book.author));
  let priceValid = $derived(isPositiveNaturalNumber(book.price));
  let quantityValid = $derived(isPositiveNaturalNumber(book.quantity));
  let bookValid = $derived(titleValid && authorValid && priceValid && quantityValid);

  async function handleUpdate(e: Event) {
    e.preventDefault();
    if (!bookValid) {
      alert("입력 정보를 확인해주세요.");
      throw new ValidationError();
    }
    const response = await fetch(`/api/books/${book.id}`, {
      method: "put",
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
      const response = await fetch(`/api/books/${book.id}`, {
        method: "delete",
      });

      if (!response.ok) {
        if (response.status === httpStatus.NOT_FOUND) {
          alert("책이 존재하지 않습니다. 저장된 책을 삭제해 주세요.");
          throw await HttpError.fromResponse(response);
        }

        alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
        throw await HttpError.fromResponse(response);
      }

      alert("삭제되었습니다.");
      await goto("/books");
    }
  }
</script>

<h1 class="text-xl font-bold mb-4">✏️  책 상세 정보</h1>

<form onsubmit={handleUpdate} class="space-y-10">
  <BookInputForm bind:book/>

  <div class="flex justify-between items-center">
    <button
      type="button"
      class="bg-gray-500 text-white px-4 py-2 rounded"
    >
      <a href="/books">목록으로</a>
    </button>
    <div class="space-x-2">
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
    </div>
  </div>
</form>
