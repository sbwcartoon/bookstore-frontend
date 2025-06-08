<script>
  const {book} = $props();
</script>

<li class="p-4 bg-white shadow rounded">
  <a href={`/books/${book.id}`}>
    <div class="font-semibold">{book.title}</div>
    <div class="text-sm text-gray-600">{book.author}</div>
    <div class="text-sm text-gray-600">{book.quantity} 권</div>
  </a>
</li>
