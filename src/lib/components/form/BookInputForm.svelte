<script>
  const {book = $bindable()} = $props();
</script>

<div class="space-y-4">
  <label class="block">
    제목
    <input bind:value={book.title} placeholder="한 글자 이상 입력하세요." class="form-input w-full" required pattern=".*\S.*"
           title="이 입력란을 작성하세요."/>
  </label>

  <label class="block">
    저자
    <input bind:value={book.author} placeholder="한 글자 이상 입력하세요." class="form-input w-full" required pattern=".*\S.*"
           title="이 입력란을 작성하세요."/>
  </label>

  <label class="block">
    가격
    <input type="number" bind:value={book.price} min="0" step="1" placeholder="0 이상 입력하세요." class="form-input w-full"
           required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  </label>

  <label class="block">
    수량
    <input type="number" bind:value={book.quantity} min="0" step="1" placeholder="0 이상 입력하세요."
           class="form-input w-full" required pattern=".*\S.*" title="이 입력란을 작성하세요."/>
  </label>
</div>
