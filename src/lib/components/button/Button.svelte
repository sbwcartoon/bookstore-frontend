<script lang="ts">
  const {
    children,
    classes,
    ...restProps
  }: {
    children: () => any,
    classes: string,
    [key: string]: unknown,
  } = $props();
</script>

<button
  {...restProps}
  class="flex justify-center items-center px-4 py-2 min-w-[100px] rounded whitespace-nowrap {classes}"
>
  {@render children()}
</button>
