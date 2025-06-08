<script lang="ts">
  import Button from "$lib/components/button/Button.svelte";

  const {
    clickHandler,
    children,
  }: {
    clickHandler: (e: Event) => any,
    children: () => any,
  } = $props();
</script>

<Button
  type="button"
  classes="bg-red-400 text-white"
  onclick={clickHandler}
>{@render children()}</Button>
