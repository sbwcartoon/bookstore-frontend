<script lang="ts">
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";
  import {httpStatus} from "$lib/status";
  import type {BookDetail} from "$lib/types/BookDetail";
  import BookInputForm from "$lib/components/form/BookInputForm.svelte";
  import GreenSubmitButton from "$lib/components/button/GreenSubmitButton.svelte";
  import DeleteBookButton from "$lib/components/form/DeleteBookButton.svelte";
  import GoToListPageButton from "$lib/components/form/GoToListPageButton.svelte";
  import PageTitle from "$lib/components/layout/PageTitle.svelte";
  import {throwIfHttpErrorByStatus} from "$lib/util/errorHandler";

  const {data} = $props();
  let book: BookDetail = $state(data.book);

  const titleValid = $derived(isNotBlank(book.title));
  const authorValid = $derived(isNotBlank(book.author));
  const priceValid = $derived(isPositiveNaturalNumber(book.price));
  const quantityValid = $derived(isPositiveNaturalNumber(book.quantity));
  const bookValid = $derived(titleValid && authorValid && priceValid && quantityValid);

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
      await throwIfHttpErrorByStatus(response, httpStatus.CONFLICT, "동일한 저자가 쓴 같은 제목의 책이 이미 존재합니다. 다른 내용으로 다시 시도해주세요.");
      await throwIfHttpErrorByStatus(response, httpStatus.BAD_REQUEST, "입력한 내용이 유효하지 않습니다. 올바르게 입력한 후 다시 시도해주세요.");
      await throwIfHttpErrorByStatus(response, httpStatus.NOT_FOUND, "책이 존재하지 않습니다. 저장된 책을 수정해 주세요.");
      await throwIfHttpErrorByStatus(response, null, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
    }

    alert("수정되었습니다.");
  }
</script>

<PageTitle>✏️ 책 상세 정보</PageTitle>

<form onsubmit={handleUpdate} class="space-y-10">
  <BookInputForm bind:book/>

  <div class="flex justify-between items-center">
    <GoToListPageButton/>
    <div class="space-x-2">
      <DeleteBookButton bookId={book.id}/>
      <GreenSubmitButton>수정</GreenSubmitButton>
    </div>
  </div>
</form>
