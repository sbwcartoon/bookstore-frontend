<script lang="ts">
  const {children}: { children: () => any } = $props();
</script>

<button
  type="submit"
  class="bg-black text-white px-4 py-2 min-w-[100px] rounded whitespace-nowrap"
>
  {@render children()}
</button>
