<script lang="ts">
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

<div>
  <button
    type="button"
    aria-label="Previous funny"
    on:click={() => changeCurrentIndex(-1)}
  >
    &lt;-
  </button>

  <p>
    {#await revisionDiffs[currentIndex]}
      loading diff...
    {:then diff}
      {diff}
    {/await}
  </p>

  <button
    type="button"
    aria-label="Next funny"
    on:click={() => changeCurrentIndex(1)}>-&gt;</button
  >
</div>

<style>
  div {
    @apply flex flex-row w-screen justify-center align-middle;
  }

  p {
    @apply text-center;
  }

  button {
    @apply text-sky-500 w-20;
  }

  button:hover {
    @apply underline;
  }
</style>
