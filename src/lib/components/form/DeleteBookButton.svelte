<script lang="ts">
  import {httpStatus} from "$lib/status.js";
  import {HttpError} from "$lib/exception/HttpError.js";
  import {goto} from "$app/navigation";
  import RedClickButton from "$lib/components/button/RedClickButton.svelte";

  const {bookId} = $props();

  async function handleDelete(e: Event) {
    e.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "delete",
      });

      if (!response.ok) {
        if (response.status === httpStatus.NOT_FOUND) {
          alert("책이 존재하지 않습니다. 저장된 책을 삭제해 주세요.");
          throw await HttpError.fromResponse(response);
        }

        alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.\n문제가 지속될 경우 관리자에게 문의해 주세요.");
        throw await HttpError.fromResponse(response);
      }

      alert("삭제되었습니다.");
      await goto("/books");
    }
  }
</script>

<RedClickButton clickHandler={handleDelete}>삭제</RedClickButton>
