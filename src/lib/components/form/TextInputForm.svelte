<script lang="ts">
  let {
    value = $bindable(),
    children,
  } = $props<{
    value: number,
    children: () => any,
  }>();
</script>

<label class="block">
  {@render children()}
  <input
    bind:value
    placeholder="한 글자 이상 입력하세요."
    class="form-input w-full"
    required
    pattern=".*\S.*"
    title="이 입력란을 작성하세요."
  />
</label>
