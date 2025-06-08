<script lang="ts">
  import Button from "$lib/components/button/Button.svelte";

  const {
    href,
    children,
  }: {
    href: string,
    children: () => any,
  } = $props();
</script>

<Button
  type="button"
  classes="bg-gray-500 text-white"
>
  <a {href}>
    {@render children()}
  </a>
</Button>
