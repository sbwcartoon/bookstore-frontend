<script lang="ts">
  import BlackSubmitButton from "$lib/components/button/BlackSubmitButton.svelte";

  let {
    title = $bindable<string>(),
    author = $bindable<string>(),
  } = $props();
</script>

<div class="flex justify-center items-center gap-1.5">
  <input type="text" bind:value={title} class="form-input w-full" placeholder="제목"/>
  <input type="text" bind:value={author} class="form-input w-full" placeholder="저자"/>
  <BlackSubmitButton>검색</BlackSubmitButton>
</div>
