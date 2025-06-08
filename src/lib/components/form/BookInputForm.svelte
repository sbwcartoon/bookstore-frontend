<script lang="ts">
  import type {Book} from "$lib/types/Book";
  import type {BookDetail} from "$lib/types/BookDetail";
  import NumberInputForm from "$lib/components/form/NumberInputForm.svelte";
  import TextInputForm from "$lib/components/form/TextInputForm.svelte";

  const {book = $bindable<Book | BookDetail>()} = $props();

  let title = $state(book.title);
  let author = $state(book.author);
  let price = $state(book.price);
  let quantity = $state(book.quantity);

  $effect(() => {
    book.title = title;
  });
  $effect(() => {
    book.author = author;
  });
  $effect(() => {
    book.price = price;
  });
  $effect(() => {
    book.quantity = quantity;
  });
</script>

<div class="space-y-4">
  <TextInputForm bind:value={title}>제목</TextInputForm>
  <TextInputForm bind:value={author}>저자</TextInputForm>
  <NumberInputForm bind:value={price}>가격</NumberInputForm>
  <NumberInputForm bind:value={quantity}>수량</NumberInputForm>
</div>
