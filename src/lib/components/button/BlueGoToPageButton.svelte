<script lang="ts">
  const {
    href,
    children,
  }: {
    href: string,
    children: () => any,
  } = $props();
</script>

<button
  type="button"
  class="flex justify-center items-center whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded"
>
  <a {href}>
    {@render children()}
  </a>
</button>
