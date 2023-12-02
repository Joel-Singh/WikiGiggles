<script lang="ts">
  import RevisionDiffSlider from "./components/RevisionDiffSlider.svelte";
  import FunnySearcher from "./components/FunnyRevisionSearcher.svelte";
  let immediateRevisions: number[] | null = null;
</script>

<main class="h-full pt-3 flex flex-col items-center gap-2">
  <h1 class="text-xl">
    Welcome to <a href="./" class="text-sky-500 hover:underline text-3xl"
      >WikiGiggles</a
    >
  </h1>

  <FunnySearcher bind:immediateRevisions />
  {#if immediateRevisions === null}
    <p>Type in a page</p>
  {:else}
    <RevisionDiffSlider revisions={immediateRevisions} />
  {/if}
</main>
