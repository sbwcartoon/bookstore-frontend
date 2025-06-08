<script lang="ts">
  const {
    mark,
    params,
  }: {
    mark: number | string,
    params: string,
  } = $props();
</script>

<a href="?{params}"
   class="flex justify-center items-center px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">{mark}</a>
