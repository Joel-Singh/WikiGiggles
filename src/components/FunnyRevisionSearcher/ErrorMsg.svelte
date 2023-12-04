<script lang="ts">
  import { fade } from "svelte/transition";
  let errorMsg: string = "";

  export const changeErrorMsg = (newMsg: string) => {
    playTransition();
    errorMsg = newMsg;
  };

  let visible = true;
  async function playTransition() {
    visible = false;
    setTimeout(() => visible = true, 400);
  }
</script>

{#if visible}
  <p transition:fade>
    {errorMsg}
  </p>
{/if}
