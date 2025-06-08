<script lang="ts">
  import PageMoveButton from "$lib/components/pagination/PageMoveButton.svelte";
  import PageNumberButton from "$lib/components/pagination/PageNumberButton.svelte";

  const {
    data,
    buildQuery,
  }: {
    data: {
      page: number,
      totalPages: number,
    },
    buildQuery: (page: number) => string,
  } = $props();

  const paginationMaxVisible = 10;
  const half = $derived(Math.floor(paginationMaxVisible / 2));
  const start = $derived(Math.max(1, Math.min(data.page - half, data.totalPages - paginationMaxVisible + 1)));
  const end = $derived(Math.min(data.totalPages, start + paginationMaxVisible - 1));
  const pages = $derived(Array.from({length: end - start + 1}, (_, i) => start + i));
</script>

<div class="flex justify-center space-x-1 p-8">
  {#if data.page > 1}
    <PageMoveButton mark="«" params={buildQuery(1)}/>
    <PageMoveButton mark="‹" params={buildQuery(data.page - 1)}/>
  {/if}

  {#each pages as p}
    <PageNumberButton
      value={p}
      params={buildQuery(p)}
      selected={data.page === p}
    />
  {/each}

  {#if data.page < data.totalPages}
    <PageMoveButton mark="›" params={buildQuery(data.page + 1)}/>
    <PageMoveButton mark="»" params={buildQuery(data.totalPages)}/>
  {/if}
</div>
