<script lang="ts">
  import "../app.css";

  const {children} = $props();
</script>

<div class="flex flex-col min-h-screen">
  <header class="bg-blue-600 text-white fixed top-0 w-full z-10 p-4">
    <h1 class="text-xl font-bold">📚 RGT 온라인 서점</h1>
  </header>

  <main class="flex-1 overflow-y-auto pt-24 pb-12">
    <div class="max-w-5xl mx-auto">
      {@render children()}
    </div>
  </main>
</div>
