<script lang="ts">
  const {
    clickHandler,
    children,
  }: {
    clickHandler: (e: Event) => any,
    children: () => any,
  } = $props();
</script>

<button
  type="button"
  class="bg-red-400 text-white px-4 py-2 rounded"
  onclick={clickHandler}
>
  {@render children()}
</button>
