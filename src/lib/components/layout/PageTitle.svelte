<script lang="ts">
  const {children}: { children: () => any } = $props();
</script>

<h1 class="text-xl font-bold mb-4">
  {@render children()}
</h1>
