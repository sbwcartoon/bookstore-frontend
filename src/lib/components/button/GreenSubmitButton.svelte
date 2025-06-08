<script lang="ts">
  const {children}: { children: () => any } = $props();
</script>

<button
  type="submit"
  class="bg-green-500 text-white px-4 py-2 rounded"
>
  {@render children()}
</button>
