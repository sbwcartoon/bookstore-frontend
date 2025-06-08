<script lang="ts">
  let {
    title = $bindable<string>(),
    author = $bindable<string>(),
  } = $props();
</script>

<div class="flex justify-center items-center gap-1.5">
  <input type="text" bind:value={title} class="form-input w-full" placeholder="제목"/>
  <input type="text" bind:value={author} class="form-input w-full" placeholder="저자"/>
  <button type="submit" class="px-10 py-2 whitespace-nowrap bg-black hover:bg-gray-900 text-white rounded">검색
  </button>
</div>
