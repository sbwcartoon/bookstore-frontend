<script lang="ts">
  import Button from "$lib/components/button/Button.svelte";

  const {children}: { children: () => any } = $props();
</script>

<Button
  type="submit"
  classes="bg-green-500 text-white"
>{@render children()}</Button>
