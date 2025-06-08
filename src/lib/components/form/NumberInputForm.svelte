<script lang="ts">
  let {
    value = $bindable(),
    children,
  } = $props<{
    value: number,
    children: () => any,
  }>();

  function handleZeroInput(e: Event) {
    const input = e.target as HTMLInputElement;
    value = Number(input.value);
    input.value = String(value);
  }
</script>

<label class="block">
  {@render children()}
  <input
    type="number"
    bind:value
    oninput={handleZeroInput}
    min="0"
    step="1"
    placeholder="0 이상 입력하세요."
    class="form-input w-full"
    required
    pattern=".*\S.*"
    title="이 입력란을 작성하세요."
  />
</label>
