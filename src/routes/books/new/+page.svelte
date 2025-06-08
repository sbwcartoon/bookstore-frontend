<script lang="ts">
  import {goto} from "$app/navigation";
  import type {Book} from "$lib/types/Book";
  import {isNotBlank, isPositiveNaturalNumber} from "$lib/util/validation";
  import {ValidationError} from "$lib/exception/ValidationError";
  import {httpStatus} from "$lib/status";
  import BookInputForm from "$lib/components/form/BookInputForm.svelte";
  import BlueSubmitButton from "$lib/components/button/BlueSubmitButton.svelte";
  import GoToListPageButton from "$lib/components/form/GoToListPageButton.svelte";
  import PageTitle from "$lib/components/layout/PageTitle.svelte";
  import {throwIfHttpErrorByStatus} from "$lib/util/errorHandler";

  let book: Book = $state({
    title: "",
    author: "",
    price: 0,
    quantity: 0,
  });

  const titleValid = $derived(isNotBlank(book.title));
  const authorValid = $derived(isNotBlank(book.author));
  const priceValid = $derived(isPositiveNaturalNumber(book.price));
  const quantityValid = $derived(isPositiveNaturalNumber(book.quantity));
  const bookValid = $derived(titleValid && authorValid && priceValid && quantityValid);

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
      await throwIfHttpErrorByStatus(response, httpStatus.CONFLICT, "동일한 저자가 쓴 같은 제목의 책이 이미 존재합니다. 다른 내용으로 다시 시도해주세요.");
      await throwIfHttpErrorByStatus(response, httpStatus.BAD_REQUEST, "입력한 내용이 유효하지 않습니다. 올바르게 입력한 후 다시 시도해주세요.");
      await throwIfHttpErrorByStatus(response, httpStatus.NOT_FOUND, "책이 존재하지 않습니다. 저장된 책을 수정해 주세요.");
      await throwIfHttpErrorByStatus(response, null, "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
    }

    alert("저장되었습니다.");
    await goto("/books");
  }
</script>

<PageTitle>📖 새 책 추가</PageTitle>

<form onsubmit={handleSubmit} class="space-y-10">
  <BookInputForm bind:book/>

  <div class="flex justify-between items-center">
    <GoToListPageButton/>
    <BlueSubmitButton>저장</BlueSubmitButton>
  </div>
</form>
