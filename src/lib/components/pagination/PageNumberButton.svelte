<script lang="ts">
  const {
    value,
    params,
    selected,
  }: {
    value: number,
    params: string,
    selected: boolean,
  } = $props();
</script>

<a
  href="?{params}"
  class={`flex justify-center items-center px-3 py-1 rounded text-sm ${
            selected ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
          }`}
>
  {value}
</a>
