<script lang="ts">
    import DiffDisplay from "../diffDisplay.svelte";
  import requestRevisionDiff from "../wikiAPI/requestRevisionDiff";

  export let revisions: number[];
  let revisionDiffs: Promise<string>[] = [];

  let currentIndex = 0;
  function changeCurrentIndex(change: number) {
    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);
    currentIndex = clamp(currentIndex + change, 0, revisions.length - 1);
  }

  $: {
    revisionDiffs = [];
    async function updateRevisionDiffs() {
      revisionDiffs = [];
      for (let i = 0; i < revisions.length; i++) {
        const request = requestRevisionDiff(revisions[i]);
        revisionDiffs.push(request);
        await request;
      }
    }

    updateRevisionDiffs()
  }
</script>

<div class="flex flex-col w-screen justify-center align-middle items-center">
  <nav class="text-sky-500 flex flex-row gap-10">
    <button
      type="button"
      aria-label="Previous funny"
      on:click={() => changeCurrentIndex(-1)}
    >
      &lt;-
    </button>
    <button
      type="button"
      aria-label="Next funny"
      on:click={() => changeCurrentIndex(1)}>-&gt;</button
    >

  </nav>

  <p class="text-center">
    {#await revisionDiffs[currentIndex]}
      loading diff...
    {:then diff}
      <DiffDisplay {diff}  />
    {/await}
  </p>

</div>

<style>
  button:hover {
    @apply underline;
  }
</style>
